"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import Matter from "matter-js"

const { Engine, Render, World, Bodies, Body, Vector } = Matter

const createKoi = (x: number, y: number, image: HTMLImageElement) => {
  console.log("Creating koi at:", x, y)
  const koi = Bodies.rectangle(x, y, 100, 50, {
    render: {
      sprite: {
        texture: image.src,
        xScale: 0.2, // Increased size
        yScale: 0.2, // Increased size
      },
    },
    frictionAir: 0,
    friction: 0,
  })
  return koi
}

export function PezKoiBackground({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<Matter.Engine | null>(null)

  useEffect(() => {
    console.log("PezKoiBackground effect running")
    if (!containerRef.current || !canvasRef.current) return

    const container = containerRef.current
    const canvas = canvasRef.current

    const engine = Engine.create()
    engineRef.current = engine

    const render = Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        width: container.clientWidth,
        height: container.clientHeight,
        wireframes: false,
        background: "rgba(200, 200, 200, 0.5)", // Light gray background for visibility
      },
    })

    const centerX = container.clientWidth / 2
    const centerY = container.clientHeight / 2
    const radius = Math.min(centerX, centerY) * 0.6 // Reduced radius for visibility

    console.log("Loading koi image")
    const image = new Image()
    image.src = "https://www.figma.com/design/ByZOs5L6EedanfVFcvwdzj/Interfaces?node-id=178-81&t=wAO3leFNNSn8CyWk-4"
    image.onload = () => {
      console.log("Koi image loaded")
      const koi = createKoi(centerX + radius, centerY, image)
      World.add(engine.world, [koi])

      let angle = 0
      const angularSpeed = 0.02 // Reduced speed for easier viewing

      const moveKoi = () => {
        angle += angularSpeed
        const x = centerX + radius * Math.cos(angle)
        const y = centerY + radius * Math.sin(angle)
        Body.setPosition(koi, Vector.create(x, y))

        const tangentAngle = angle + Math.PI / 2
        Body.setAngle(koi, tangentAngle)

        requestAnimationFrame(moveKoi)
      }

      console.log("Starting engine and render")
      Engine.run(engine)
      Render.run(render)
      moveKoi()
    }

    const handleResize = () => {
      render.canvas.width = container.clientWidth
      render.canvas.height = container.clientHeight
      render.options.width = container.clientWidth
      render.options.height = container.clientHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      Render.stop(render)
      World.clear(engine.world, false)
      Engine.clear(engine)
      render.canvas.remove()
      render.canvas = null as any
      render.context = null as any
      render.textures = {}
    }
  }, [])

  return (
    <div ref={containerRef} className="relative h-screen w-full">
      <canvas ref={canvasRef} className="absolute h-full w-full" />
      <div className="flex flex-col h-full">
        <div className="grow"></div>
        <div className="relative z-10">{children}</div>
        <div className="grow-[2]"></div>
      </div>
    </div>
  )
}

