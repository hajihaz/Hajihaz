"use client"

import { useEffect, useMemo, useState } from "react"

export default function Home() {
  const [progress, setProgress] = useState(0)
  const [brand, setBrand] = useState("HAJIHAZ")
  const [redIndex, setRedIndex] = useState<number | null>(null)
  const glyphs = useMemo(() => "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", [])

  useEffect(() => {
    const started = performance.now()
    const duration = 1800
    let frame = 0

    const tick = (now: number) => {
      const elapsed = now - started
      const next = Math.min(100, Math.round((elapsed / duration) * 100))
      setProgress(next)
      if (next < 100) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)

    let scramble = 0
    const scrambleTimer = window.setInterval(() => {
      scramble += 1
      const intensity = progress < 100 ? 0.42 : 0.12
      const next = "HAJIHAZ"
        .split("")
        .map((letter) => Math.random() < intensity ? glyphs[Math.floor(Math.random() * glyphs.length)] : letter)
        .join("")
      setBrand(next)
      setRedIndex(Math.random() < 0.28 ? Math.floor(Math.random() * 7) : null)
      if (progress >= 100 && scramble > 18) setBrand("HAJIHAZ")
    }, 95)

    return () => {
      cancelAnimationFrame(frame)
      window.clearInterval(scrambleTimer)
    }
  }, [glyphs, progress])

  return (
    <main className="initializing" aria-label="Hajihaz portfolio initialization">
      <div className="initializing__content">
        <div className="initializing__brand" aria-label="HAJIHAZ">
          {brand.split("").map((letter, index) => (
            <span key={`${index}-${letter}`} className={redIndex === index ? "is-red" : ""}>{letter}</span>
          ))}
        </div>
        <div className="initializing__status">
          <span>INITIALIZING...</span>
          <span>{progress.toString().padStart(3, "0")}</span>
        </div>
        <div className="initializing__track" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
      </div>
    </main>
  )
}
