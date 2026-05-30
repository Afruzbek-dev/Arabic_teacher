import React, { useEffect, useRef, useState } from 'react'

// Free-form letter tracing on a canvas (not graded — practice only).
export default function TracingPad({ step }) {
  const { letter } = step.data
  const canvasRef = useRef(null)
  const drawing = useRef(false)
  const [hasDrawn, setHasDrawn] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = 14
    ctx.strokeStyle = '#58CC02'
    drawGuide(ctx, rect.width, rect.height)
  }, [letter.ar])

  const drawGuide = (ctx, w, h) => {
    ctx.save()
    ctx.font = `${Math.min(w, h) * 0.7}px Amiri, serif`
    ctx.fillStyle = '#E5E5E5'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(letter.ar, w / 2, h / 2)
    ctx.restore()
  }

  const pos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    const p = e.touches ? e.touches[0] : e
    return { x: p.clientX - rect.left, y: p.clientY - rect.top }
  }

  const start = (e) => {
    e.preventDefault()
    drawing.current = true
    const ctx = canvasRef.current.getContext('2d')
    const { x, y } = pos(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
    setHasDrawn(true)
  }
  const move = (e) => {
    if (!drawing.current) return
    e.preventDefault()
    const ctx = canvasRef.current.getContext('2d')
    const { x, y } = pos(e)
    ctx.lineTo(x, y)
    ctx.stroke()
  }
  const end = () => {
    drawing.current = false
  }

  const clear = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawGuide(ctx, rect.width, rect.height)
    setHasDrawn(false)
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-muted">
        «<span className="font-arabic text-2xl">{letter.ar}</span>» — {letter.name} harfini chizing
      </p>
      <canvas
        ref={canvasRef}
        className="h-64 w-full max-w-xs touch-none rounded-3xl border-2 border-line bg-white"
        onMouseDown={start}
        onMouseMove={move}
        onMouseUp={end}
        onMouseLeave={end}
        onTouchStart={start}
        onTouchMove={move}
        onTouchEnd={end}
      />
      <button onClick={clear} className="rounded-full bg-line px-4 py-1.5 text-sm font-bold text-muted">
        🧹 Tozalash
      </button>
    </div>
  )
}
