"use client"

import { useEffect, useState } from "react"

export default function Home() {
  const [progress, setProgress] = useState(0)

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
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <main className="initializing" aria-label="Hajihaz portfolio initialization">
      <div className="initializing__content">
        <div className="initializing__brand" aria-label="HAJIHAZ">HAJIHAZ</div>
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
