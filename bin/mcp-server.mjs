#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, relative, sep } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const docsDir = join(__dirname, "..", "docs", "content");

// Strip numeric prefix (e.g. "1.getting-started" -> "getting-started", "2.installation.md" -> "installation.md")
function stripPrefix(name) {
  return name.replace(/^\d+\./, "");
}

// Parse simple YAML frontmatter
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { title: "", description: "", body: content };
  const fm = match[1];
  const body = content.slice(match[0].length).trim();
  const title = (fm.match(/^title:\s*(.+)$/m) || [])[1]?.trim().replace(/\r$/, "") || "";
  const description = (fm.match(/^description:\s*(.+)$/m) || [])[1]?.trim().replace(/\r$/, "") || "";
  return { title, description, body };
}

// Walk docs/content and build a list of pages with their paths
async function collectPages(dir, baseDir = dir) {
  const pages = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return pages;
  }
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      const sub = await collectPages(fullPath, baseDir);
      pages.push(...sub);
    } else if (entry.name.endsWith(".md")) {
      const relPath = relative(baseDir, fullPath);
      // Strip number prefixes from each path segment
      const segments = relPath.split(sep).map(stripPrefix);
      const pagePath = "/" + segments.join("/").replace(/\.md$/, "");
      // Normalize: index.md -> parent dir path
      const normalizedPath = pagePath.endsWith("/index") ? pagePath.replace(/\/index$/, "") || "/" : pagePath;
      const content = await readFile(fullPath, "utf-8");
      const { title, description } = parseFrontmatter(content);
      pages.push({ path: normalizedPath, title, description, fullPath });
    }
  }
  return pages;
}

const server = new McpServer({ name: "nuxt-motion-block", version: "0.0.5" });

server.tool(
  "list-pages",
  "Lists all available documentation pages with their categories and basic information. Use this to explore or search for documentation about a topic.",
  {},
  async () => {
    const pages = await collectPages(docsDir);
    const result = pages.map((p) => ({
      title: p.title,
      path: p.path,
      description: p.description,
    }));
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "get-page",
  "Retrieves the full content and details of a specific documentation page. Use this when you know the exact path to a documentation page.",
  { path: z.string().describe("The page path (e.g., /getting-started/installation)") },
  async ({ path }) => {
    const pages = await collectPages(docsDir);
    const page = pages.find((p) => p.path === path);
    if (!page) {
      return { content: [{ type: "text", text: `Page not found: ${path}` }], isError: true };
    }
    const content = await readFile(page.fullPath, "utf-8");
    const { title, description, body } = parseFrontmatter(content);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({ title, path: page.path, description, content: body }, null, 2),
        },
      ],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);