// @ts-nocheck
import { onMounted, onUnmounted, type Ref } from 'vue'
import { resolveCssColor } from '../utils/theme-color'

export const useCanvasCursor = (canvasRef: Ref<HTMLCanvasElement>, options: { color?: string } = {}) => {
  onMounted(() => {
    const canvas = canvasRef.value
    if (!canvas) {
      return
    }

    let ctx, f, lines, animationFrameId

    const config = {
      friction: 0.5,
      trails: 20,
      size: 50,
      dampening: 0.25,
      tension: 0.98,
    }

    const pos = {}
    lines = []

    function Wave(e) {
      this.init(e || {})
    }

    Wave.prototype = {
      init: function (e) {
        this.phase = e.phase || 0
        this.offset = e.offset || 0
        this.frequency = e.frequency || 0.001
        this.amplitude = e.amplitude || 1
      },
      update: function () {
        this.phase += this.frequency
        return this.offset + Math.sin(this.phase) * this.amplitude
      },
    }

    function Node() {
      this.x = 0
      this.y = 0
      this.vy = 0
      this.vx = 0
    }

    function Line(e) {
      this.init(e || {})
    }

    Line.prototype = {
      init: function (e) {
        this.spring = e.spring + 0.1 * Math.random() - 0.02
        this.friction = config.friction + 0.01 * Math.random() - 0.002
        this.nodes = []
        for (let i = 0; i < config.size; i++) {
          const t = new Node()
          t.x = pos.x
          t.y = pos.y
          this.nodes.push(t)
        }
      },
      update: function () {
        let e = this.spring
        let t = this.nodes[0]
        t.vx += (pos.x - t.x) * e
        t.vy += (pos.y - t.y) * e
        for (let i = 0, a = this.nodes.length; i < a; i++) {
          t = this.nodes[i]
          if (i > 0) {
            const n = this.nodes[i - 1]
            t.vx += (n.x - t.x) * e
            t.vy += (n.y - t.y) * e
            t.vx += n.vx * config.dampening
            t.vy += n.vy * config.dampening
          }
          t.vx *= this.friction
          t.vy *= this.friction
          t.x += t.vx
          t.y += t.vy
          e *= config.tension
        }
      },
      draw: function () {
        let e, t
        let n = this.nodes[0].x
        let i = this.nodes[0].y
        ctx.beginPath()
        ctx.moveTo(n, i)
        let a = 1
        for (let o = this.nodes.length - 2; a < o; a++) {
          e = this.nodes[a]
          t = this.nodes[a + 1]
          n = 0.5 * (e.x + t.x)
          i = 0.5 * (e.y + t.y)
          ctx.quadraticCurveTo(e.x, e.y, n, i)
        }
        e = this.nodes[a]
        t = this.nodes[a + 1]
        ctx.quadraticCurveTo(e.x, e.y, t.x, t.y)
        ctx.stroke()
        ctx.closePath()
      },
    }

    function render() {
      if (!ctx.running) return

      ctx.globalCompositeOperation = 'source-over'
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      ctx.globalCompositeOperation = 'lighter'
      ctx.lineWidth = 1

      if (options.color && options.color !== 'random') {
        const resolved = resolveCssColor(`var(--color-${options.color}-500)`)
        ctx.strokeStyle = resolved ?? ('hsla(' + Math.round(f.update()) + ',50%,50%,0.2)')
      }
      else {
        ctx.strokeStyle = 'hsla(' + Math.round(f.update()) + ',50%,50%,0.2)'
      }

      for (let i = 0; i < config.trails; i++) {
        lines[i].update()
        lines[i].draw()
      }

      ctx.frame++
      animationFrameId = window.requestAnimationFrame(render)
    }

    function resizeCanvas() {
      if (!ctx) return
      ctx.canvas.width = document.documentElement.clientWidth
      ctx.canvas.height = document.documentElement.clientHeight
    }

    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      let eventX, eventY

      if (e.touches) {
        eventX = e.touches[0].clientX
        eventY = e.touches[0].clientY
      }
      else {
        eventX = e.clientX
        eventY = e.clientY
      }

      pos.x = eventX - rect.left
      pos.y = eventY - rect.top
      e.preventDefault()
    }

    const handleTouchStart = (e) => {
      const rect = canvas.getBoundingClientRect()
      if (e.touches.length == 1) {
        pos.x = e.touches[0].clientX - rect.left
        pos.y = e.touches[0].clientY - rect.top
      }
    }

    const initEventListeners = (e) => {
      document.removeEventListener('mousemove', initEventListeners)
      document.removeEventListener('touchstart', initEventListeners)

      document.addEventListener('mousemove', handlePointerMove)
      document.addEventListener('touchmove', handlePointerMove)
      document.addEventListener('touchstart', handleTouchStart)

      handlePointerMove(e)
      createLines()
      render()
    }

    function createLines() {
      lines = []
      for (let i = 0; i < config.trails; i++) {
        lines.push(new Line({ spring: 0.4 + (i / config.trails) * 0.025 }))
      }
    }

    const handleFocus = () => {
      if (!ctx.running) {
        ctx.running = true
        render()
      }
    }

    const handleBlur = () => {
      ctx.running = false
    }

    function init() {
      ctx = canvas.getContext('2d')
      ctx.running = true
      ctx.frame = 1

      f = new Wave({
        phase: Math.random() * 2 * Math.PI,
        amplitude: 85,
        frequency: 0.0015,
        offset: 285,
      })

      document.addEventListener('mousemove', initEventListeners)
      document.addEventListener('touchstart', initEventListeners)
      window.addEventListener('resize', resizeCanvas)
      window.addEventListener('focus', handleFocus)
      window.addEventListener('blur', handleBlur)

      resizeCanvas()
    }

    init()

    onUnmounted(() => {
      document.removeEventListener('mousemove', initEventListeners)
      document.removeEventListener('touchstart', initEventListeners)
      document.removeEventListener('mousemove', handlePointerMove)
      document.removeEventListener('touchmove', handlePointerMove)
      document.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('blur', handleBlur)
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId)
      }
      if (ctx) {
        ctx.running = false
      }
    })
  })
}
