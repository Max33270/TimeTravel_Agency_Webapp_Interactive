"use client"

import { useEffect, useRef } from "react"

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number

    const stars: {
      x: number
      y: number
      radius: number
      opacity: number
      speed: number
      twinkleSpeed: number
      twinkleOffset: number
    }[] = []

    function resize() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function createStars() {
      stars.length = 0
      const count = Math.floor((window.innerWidth * window.innerHeight) / 4000)
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          radius: Math.random() * 1.5 + 0.3,
          opacity: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 0.3 + 0.05,
          twinkleSpeed: Math.random() * 0.01 + 0.005,
          twinkleOffset: Math.random() * Math.PI * 2,
        })
      }
    }

    function draw(time: number) {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const star of stars) {
        const twinkle =
          Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.4 + 0.6
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)

        const isCyan = Math.random() > 0.97
        if (isCyan) {
          ctx.fillStyle = `rgba(0, 240, 255, ${star.opacity * twinkle})`
        } else {
          ctx.fillStyle = `rgba(220, 230, 255, ${star.opacity * twinkle})`
        }
        ctx.fill()

        star.y -= star.speed
        if (star.y < -5) {
          star.y = canvas.height + 5
          star.x = Math.random() * canvas.width
        }
      }

      animationId = requestAnimationFrame(draw)
    }

    resize()
    createStars()
    animationId = requestAnimationFrame(draw)

    window.addEventListener("resize", () => {
      resize()
      createStars()
    })

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  )
}
