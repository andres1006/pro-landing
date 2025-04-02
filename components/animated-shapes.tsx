"use client"

import { useRef, useMemo } from "react"
import { useScroll, animated, useSpring } from "@react-spring/web"

// Componente individual para cada forma animada
const AnimatedShape = ({ shape, index, sizeMap, scrollYProgress }) => {
  const springProps = useSpring({
    opacity: scrollYProgress.to([0, 0.5, 1], [0.5, 1, 0.5]),
    transform: scrollYProgress.to(
      [0, 0.5, 1],
      [
        `translateY(0px) rotate(0deg)`,
        `translateY(-${20 * (index + 1)}px) rotate(${10 * (index + 1)}deg)`,
        `translateY(0px) rotate(${20 * (index + 1)}deg)`,
      ],
    ),
    config: { mass: 1, tension: 170, friction: 26 },
    delay: shape.delay * 1000,
  })

  return (
    <animated.div
      style={springProps}
      className={`absolute ${shape.position} ${shape.color} blur-xl ${
        shape.type === "triangle" ? "" : sizeMap[shape.size] || sizeMap.md
      } ${shape.type === "square" ? "" : "rounded-full"}`}
    >
      {shape.type === "triangle" && (
        <div
          className={`
            ${sizeMap[shape.size].split(" ")[0] || "h-24"} 
            ${sizeMap[shape.size].split(" ")[1] || "w-24"}
            ${shape.color}
            clip-path-triangle
          `}
          style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
        />
      )}
    </animated.div>
  )
}

// Componente de formas animadas que responden al scroll
export const AnimatedShapes = ({ className = "", variant = "default" }) => {
  const containerRef = useRef(null)
  const scrollRef = useScroll({
    container: typeof window !== "undefined" ? window : undefined,
  })
  const scrollYProgress = scrollRef.scrollYProgress

  // Diferentes variantes de formas
  const shapes = {
    default: [
      {
        type: "circle",
        size: "lg",
        color: "bg-blue-500/20",
        position: "top-10 left-10",
        delay: 0,
      },
      {
        type: "square",
        size: "md",
        color: "bg-green-500/20",
        position: "bottom-20 right-20",
        delay: 0.1,
      },
      {
        type: "triangle",
        size: "sm",
        color: "bg-yellow-500/20",
        position: "top-1/3 right-10",
        delay: 0.2,
      },
      {
        type: "circle",
        size: "sm",
        color: "bg-purple-500/20",
        position: "bottom-10 left-1/4",
        delay: 0.3,
      },
    ],
    hero: [
      {
        type: "circle",
        size: "xl",
        color: "bg-blue-500/10",
        position: "top-1/4 -left-20",
        delay: 0,
      },
      {
        type: "circle",
        size: "lg",
        color: "bg-purple-500/10",
        position: "bottom-10 -right-10",
        delay: 0.1,
      },
      {
        type: "square",
        size: "lg",
        color: "bg-green-500/10",
        position: "-bottom-20 left-1/3",
        delay: 0.2,
      },
    ],
    features: [
      {
        type: "circle",
        size: "md",
        color: "bg-yellow-500/15",
        position: "top-10 right-10",
        delay: 0,
      },
      {
        type: "square",
        size: "sm",
        color: "bg-blue-500/15",
        position: "bottom-20 left-20",
        delay: 0.1,
      },
      {
        type: "triangle",
        size: "lg",
        color: "bg-green-500/15",
        position: "top-1/2 left-10",
        delay: 0.2,
      },
    ],
    cta: [
      {
        type: "circle",
        size: "xl",
        color: "bg-blue-500/20",
        position: "-top-20 -left-20",
        delay: 0,
      },
      {
        type: "circle",
        size: "lg",
        color: "bg-purple-500/20",
        position: "-bottom-20 -right-20",
        delay: 0.1,
      },
      {
        type: "square",
        size: "md",
        color: "bg-green-500/20",
        position: "top-1/2 -right-10 rotate-45",
        delay: 0.2,
      },
    ],
  }

  const currentShapes = shapes[variant] || shapes.default

  // Mapeo de tamaños
  const sizeMap = {
    sm: "h-16 w-16",
    md: "h-24 w-24",
    lg: "h-40 w-40",
    xl: "h-64 w-64",
  }

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {currentShapes.map((shape, index) => (
        <AnimatedShape key={index} shape={shape} index={index} sizeMap={sizeMap} scrollYProgress={scrollYProgress} />
      ))}
    </div>
  )
}

// Componente de fondo animado con gradiente
export const AnimatedGradientBackground = ({ className = "" }) => {
  const containerRef = useRef(null)
  const scrollRef = useScroll({
    container: typeof window !== "undefined" ? window : undefined,
  })
  const scrollYProgress = scrollRef.scrollYProgress

  // Animación del gradiente basada en el scroll
  const springProps = useSpring({
    background: scrollYProgress.to(
      [0, 0.5, 1],
      [
        "radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.15), rgba(0, 0, 0, 0) 50%)",
        "radial-gradient(circle at 70% 50%, rgba(139, 92, 246, 0.15), rgba(0, 0, 0, 0) 50%)",
        "radial-gradient(circle at 30% 80%, rgba(16, 185, 129, 0.15), rgba(0, 0, 0, 0) 50%)",
      ],
    ),
    config: { duration: 1000 },
  })

  return <animated.div ref={containerRef} style={springProps} className={`absolute inset-0 ${className}`} />
}

// Componente individual para cada línea
const AnimatedLine = ({ index, scrollYProgress, count, color }) => {
  const springProps = useSpring({
    x: scrollYProgress.to([0, 1], [0, (index % 2 === 0 ? 100 : -100) * (index + 1)]),
    config: { mass: 1, tension: 170, friction: 26 },
    delay: index * 100,
  })

  return (
    <animated.div
      style={{
        ...springProps,
        top: `${(100 / count) * index}%`,
        height: "1px",
        width: "100%",
        transform: `translateX(${index % 2 === 0 ? "-50%" : "0"})`,
      }}
      className={`absolute ${color}`}
    />
  )
}

// Componente de líneas animadas
export const AnimatedLines = ({ className = "", count = 5, color = "bg-primary-foreground/5" }) => {
  const containerRef = useRef(null)
  const scrollRef = useScroll({
    container: typeof window !== "undefined" ? window : undefined,
  })
  const scrollYProgress = scrollRef.scrollYProgress

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {[...Array(count)].map((_, index) => (
        <AnimatedLine key={index} index={index} scrollYProgress={scrollYProgress} count={count} color={color} />
      ))}
    </div>
  )
}

// Componente individual para cada punto
const AnimatedDot = ({ dot, index, scrollYProgress, color }) => {
  const springProps = useSpring({
    opacity: scrollYProgress.to([0, 0.5, 1], [0.3, 1, 0.3]),
    transform: scrollYProgress.to(
      [0, 1],
      [`translateY(0px)`, `translateY(${(index % 2 === 0 ? -20 : 20) * (Math.random() + 0.5)}px)`],
    ),
    config: { mass: 1, tension: 170, friction: 26 },
    delay: dot.delay * 1000,
  })

  return (
    <animated.div
      style={{
        ...springProps,
        left: `${dot.x}%`,
        top: `${dot.y}%`,
        width: `${dot.size}px`,
        height: `${dot.size}px`,
      }}
      className={`absolute rounded-full ${color}`}
    />
  )
}

// Componente de puntos animados
export const AnimatedDots = ({ className = "", density = 20, color = "bg-primary-foreground/10" }) => {
  const containerRef = useRef(null)
  const scrollRef = useScroll({
    container: typeof window !== "undefined" ? window : undefined,
  })
  const scrollYProgress = scrollRef.scrollYProgress

  // Generar posiciones aleatorias para los puntos
  const dots = useMemo(() => {
    return Array.from({ length: density }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 0.5,
    }))
  }, [density])

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {dots.map((dot, index) => (
        <AnimatedDot key={index} dot={dot} index={index} scrollYProgress={scrollYProgress} color={color} />
      ))}
    </div>
  )
}

// Componente individual para cada onda
const AnimatedWave = ({ index, scrollYProgress, color }) => {
  const springProps = useSpring({
    transform: scrollYProgress.to(
      [0, 1],
      [`translateY(${index * 20}px) scaleX(1)`, `translateY(${index * 30}px) scaleX(${1 + index * 0.1})`],
    ),
    config: { mass: 1, tension: 170, friction: 26 },
    delay: index * 200,
  })

  return (
    <animated.div
      style={{
        ...springProps,
        bottom: `${index * 10}%`,
        height: "100px",
        borderRadius: "50%",
        opacity: 0.1 + index * 0.05,
      }}
      className={`absolute w-full ${color}`}
    />
  )
}

// Componente de ondas animadas
export const AnimatedWaves = ({ className = "", color = "bg-primary-foreground/5" }) => {
  const containerRef = useRef(null)
  const scrollRef = useScroll({
    container: typeof window !== "undefined" ? window : undefined,
  })
  const scrollYProgress = scrollRef.scrollYProgress

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {[...Array(3)].map((_, index) => (
        <AnimatedWave key={index} index={index} scrollYProgress={scrollYProgress} color={color} />
      ))}
    </div>
  )
}

