"use client"

import { useEffect, useMemo, useState } from "react"

type Project = { id: string; num: string; name: string; type: string; text: string; accent: string }

const projects: Project[] = [
  { id: "allbee", num: "01", name: "ALLBEE", type: "BUSINESS SYSTEMS", text: "A growing operating system for businesses — CRM, finance, networks, automation and intelligence.", accent: "signal" },
  { id: "suplaykart", num: "02", name: "SUPLAYKART", type: "COMMERCE / LOGISTICS", text: "Quick commerce infrastructure designed around the last mile, inventory and speed.", accent: "warm" },
  { id: "hhn", num: "03", name: "HAJIZHAZ NETWORK", type: "BLOCKCHAIN / PROTOCOL", text: "A proof-of-work network built from first principles. Native asset: HJZ.", accent: "red" },
  { id: "rkn", num: "04", name: "RKN ASSOCIATES", type: "LAW / DIGITAL", text: "A legal practice translated into a focused, modern digital experience.", accent: "paper" },
  { id: "namma", num: "05", name: "NAMMA ROAD", type: "CIVIC TECHNOLOGY", text: "A civic reporting experiment turning street-level problems into actionable data.", accent: "green" },
]

const stack = ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "Vercel", "GitHub", "AI", "Blockchain", "Law"]

export default function Home() {
  const [progress, setProgress] = useState(0)
  const [brand, setBrand] = useState("HAJIHAZ")
  const [redIndex, setRedIndex] = useState<number | null>(null)
  const [active, setActive] = useState("home")
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [menu, setMenu] = useState(false)
  const glyphs = useMemo(() => "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", [])

  useEffect(() => {
    const started = performance.now()
    const duration = 1800
    let frame = 0
    const tick = (now: number) => {
      const next = Math.min(100, Math.round(((now - started) / duration) * 100))
      setProgress(next)
      if (next < 100) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    const scrambleTimer = window.setInterval(() => {
      const intensity = progress < 100 ? 0.42 : 0.08
      setBrand("HAJIHAZ".split("").map((letter) => Math.random() < intensity ? glyphs[Math.floor(Math.random() * glyphs.length)] : letter).join(""))
      setRedIndex(Math.random() < 0.18 ? Math.floor(Math.random() * 7) : null)
    }, 95)
    return () => { cancelAnimationFrame(frame); window.clearInterval(scrambleTimer) }
  }, [glyphs, progress])

  useEffect(() => {
    const onMove = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY })
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[data-section]"))
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.getAttribute("data-section") || "home") })
    }, { rootMargin: "-35% 0px -55% 0px" })
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenu(false) }

  return (
    <div className="site">
      <div className="cursor" style={{ left: cursor.x, top: cursor.y }} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <header className="nav">
        <button className="wordmark" onClick={() => scrollTo("home")} aria-label="Go home">H<span>H</span></button>
        <nav className={`navlinks ${menu ? "open" : ""}`}>
          {["work", "universe", "thinking", "now"].map((item) => <button key={item} className={active === item ? "active" : ""} onClick={() => scrollTo(item)}>{item}</button>)}
        </nav>
        <button className="nav-cta" onClick={() => scrollTo("contact")}>LET'S TALK <span>↗</span></button>
        <button className="menu" onClick={() => setMenu(!menu)} aria-label="Menu"><i /><i /></button>
      </header>

      <main>
        <section id="home" data-section="home" className="hero">
          <div className="hero-orbit orbit-a" /><div className="hero-orbit orbit-b" /><div className="hero-orbit orbit-c" /><div className="hero-grid" />
          <div className="hero-content">
            <div className="eyebrow"><span className="dot" /> DIGITAL BUILDER / INDIA / 2026</div>
            <h1><span>BUILDING</span><span className="outline">THE UNBUILT.</span></h1>
            <p className="hero-copy">Founder. Engineer. Law student. Market thinker.<br />I build systems across worlds that usually stay separate.</p>
            <button className="scroll-cue" onClick={() => scrollTo("intro")}><span>SCROLL TO ENTER</span><b>↓</b></button>
          </div>
          <div className="hero-side">00 / 10<br /><span>HAJIHAZ</span></div>
          <div className="hero-status"><span>LIVE / PORTFOLIO OS</span><span>CHENNAI · IN</span></div>
        </section>

        <section id="intro" data-section="intro" className="intro section-pad">
          <div className="section-index">01 — IDENTITY</div>
          <div className="intro-grid"><div><p className="kicker">ONE PERSON.<br />MULTIPLE WORLDS.</p></div><div className="manifesto"><p>I build companies.<br />I build software.<br />I study law.<br />I read markets.<br />I experiment with ideas.</p><p className="muted">The common thread is simple: <em>systems.</em><br />How they are built. How they behave. How they scale.</p></div></div>
        </section>

        <section id="universe" data-section="universe" className="universe section-pad">
          <div className="section-index">02 — THE UNIVERSE</div>
          <div className="universe-head"><div><p className="kicker">THE HAJIHAZ<br />UNIVERSE</p></div><p className="muted max">A living map of the things being built, studied and tested. Move through the orbit.</p></div>
          <div className="universe-map"><div className="universe-ring ring-1" /><div className="universe-ring ring-2" /><div className="universe-ring ring-3" /><div className="core"><span>HH</span><small>HAJIHAZ</small></div>{["LAW", "CAPITAL", "AI", "ALLBEE", "SUPLAYKART", "HHN", "CIVIC", "RKN"].map((n, i) => <button className={`node node-${i + 1}`} key={n} onClick={() => scrollTo("work")}><span />{n}</button>)}</div>
        </section>

        <section id="work" data-section="work" className="work section-pad">
          <div className="section-index">03 — SELECTED WORK</div>
          <div className="work-intro"><p className="kicker">BUILT, NOT<br />IMAGINED.</p><p className="muted max">A selection of systems, products and experiments. Each one is a different answer to the same question: what happens if we build it properly?</p></div>
          <div className="project-list">{projects.map((project) => <article className={`project ${project.accent}`} key={project.id}><div className="project-num">{project.num}</div><div className="project-main"><div className="project-visual"><div className="visual-core" /><div className="visual-lines" /><div className="visual-scan" /></div><div className="project-copy"><span>{project.type}</span><h2>{project.name}</h2><p>{project.text}</p></div></div><div className="project-arrow">↗</div></article>)}</div>
        </section>

        <section className="architecture section-pad"><div className="section-index">04 — BUILDER MODE</div><div className="architecture-grid"><div><p className="kicker">FROM IDEA<br />TO SYSTEM.</p><p className="muted">Product thinking meets engineering. I care about the layer underneath the interface: data, permissions, automation, failure states and the boring details that make ambitious ideas real.</p></div><div className="stack-cloud">{stack.map((s, i) => <span key={s} style={{ "--i": i } as React.CSSProperties}>{s}</span>)}</div></div></section>

        <section id="thinking" data-section="thinking" className="thinking section-pad"><div className="section-index">05 — TECHNOLOGY × LAW × BUSINESS</div><div className="thinking-grid"><div className="giant-word">THINK<br /><span>IN</span><br />SYSTEMS.</div><div className="thinking-copy"><p>Understanding systems means understanding both <strong>how they are built</strong> and <strong>how they are governed.</strong></p><div className="thinking-lines"><span>CONSTITUTIONAL LAW</span><span>CORPORATE SYSTEMS</span><span>TECHNOLOGY</span><span>GOVERNANCE</span><span>ENTREPRENEURSHIP</span></div></div></div></section>

        <section className="markets section-pad"><div className="section-index">06 — MARKETS / CAPITAL</div><div className="terminal"><div className="terminal-top"><span>HH / MARKET DESK</span><span>DECISION &gt; NOISE</span></div><div className="ticker"><span>NIFTY</span><b>—</b><span>GOLD</span><b>—</b><span>BTC</span><b>—</b><span>USDINR</span></div><div className="market-copy"><p className="kicker">CAPITAL IS<br />A SYSTEM TOO.</p><p className="muted">Equities, commodities, macro and risk. Less about predicting the future. More about building a process that survives being wrong.</p></div><div className="terminal-grid">{["SIGNAL", "RISK", "CONTEXT", "TIMING"].map((x, i) => <div key={x}><small>0{i + 1}</small><strong>{x}</strong><span>{["Separate signal from noise.", "Know what can break.", "Zoom out before acting.", "Patience is a position."][i]}</span></div>)}</div></div></section>

        <section className="lab section-pad"><div className="section-index">07 — HAJI LAB</div><div className="lab-head"><p className="kicker">EXPERIMENTS<br />IN PUBLIC.</p><p className="muted max">AI, blockchain, automation, civic tech, interfaces, weird ideas. Some become products. Some become lessons. All of them move the system forward.</p></div><div className="lab-marquee"><div>AI · BLOCKCHAIN · AUTOMATION · CIVIC TECH · FUTURE SYSTEMS · AI · BLOCKCHAIN · AUTOMATION · CIVIC TECH · FUTURE SYSTEMS ·</div></div></section>

        <section id="now" data-section="now" className="now section-pad"><div className="section-index">08 — RIGHT NOW</div><div className="now-grid"><div><p className="kicker">WHAT I'M<br />BUILDING NOW.</p></div><div className="now-list">{[["HAJIZHAZ NETWORK", "Protocol / PoW / HJZ"], ["ALLBEE", "Business OS / AI / Finance"], ["SUPLAYKART", "Commerce / Logistics"], ["THIS PORTFOLIO", "Identity / Interface / Experiment"], ["LAW", "LLB / Systems / Governance"]].map(([a,b], i) => <div key={a}><span>0{i+1}</span><strong>{a}</strong><em>{b}</em><b>↗</b></div>)}</div></div></section>

        <section className="timeline section-pad"><div className="section-index">09 — THE JOURNEY</div><div className="timeline-track"><div className="timeline-line" />{[["01", "BUILD", "The first idea becomes a system."], ["02", "LEARN", "Engineering, business, law, markets."], ["03", "SCALE", "Products become ecosystems."], ["04", "NEXT", "The interesting part is still ahead."]].map(([n,t,d], i) => <div className={`milestone m${i}`} key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}</div></section>

        <section id="contact" data-section="contact" className="contact section-pad"><div className="contact-glow" /><div className="section-index">10 — CONTACT</div><div className="contact-content"><p className="kicker">LET'S BUILD<br /><span>SOMETHING.</span></p><a href="mailto:hello@hajihaz.com">hello@hajihaz.com ↗</a><div className="contact-links"><a href="https://github.com/hajihaz/Hajihaz" target="_blank" rel="noreferrer">GITHUB</a><a href="#">LINKEDIN</a><a href="#">INSTAGRAM</a><a href="#">X / TWITTER</a></div></div><footer><span>HAJIHAZ © 2026</span><span>BUILDING THE UNBUILT.</span><button onClick={() => scrollTo("home")}>BACK TO TOP ↑</button></footer></section>
      </main>
    </div>
  )
}
