"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, FormEvent, ReactNode } from "react";
import { currentFocus, domains, layers, profile, projects, timeline } from "../content/site";
import type { DomainId, Project } from "../content/site";
import ProjectArt from "./ProjectArt";

const Sculpture = dynamic(() => import("./Sculpture"), { ssr: false, loading: () => <div className="sculpture-placeholder" aria-hidden="true"/> });
const nav = [{ id:"work",label:"Selected work" },{ id:"universe",label:"The universe" },{ id:"identity",label:"The person" },{ id:"contact",label:"Connect" }];
const featured = projects.filter(p => p.featured);
const Arrow = ({ diagonal = false }: { diagonal?: boolean }) => <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
const Label = ({ n, children, light = false }: { n: string; children: ReactNode; light?: boolean }) => <div className={`section-label ${light?"on-light":""}`}><span>{n}</span><span>{children}</span><i aria-hidden="true"/></div>;

function Dialog({ open, title, children, onClose, wide = false }: { open: boolean; title: string; children: ReactNode; onClose:()=>void; wide?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  const returnFocus=useRef<HTMLElement|null>(null);
  useEffect(()=>{
    const dialog=ref.current;
    if(!dialog)return;
    if(open&&!dialog.open){returnFocus.current=document.activeElement as HTMLElement;dialog.showModal();}
    if(!open&&dialog.open){dialog.close();returnFocus.current?.focus({preventScroll:true});}
    if(!open)return;
    const previous=document.body.style.overflow;document.body.style.overflow="hidden";
    return()=>{document.body.style.overflow=previous;};
  },[open]);
  return <dialog ref={ref} className={`overlay ${wide?"overlay-wide":""}`} aria-label={title} onCancel={onClose} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
    <div className="overlay-inner"><button className="close-dialog" type="button" aria-label="Close dialog" onClick={onClose}>Close <span aria-hidden="true">×</span></button>{children}</div>
  </dialog>;
}

function HajiOS({ open, onClose }: { open: boolean; onClose:()=>void }) {
  const [input,setInput]=useState("");
  const [lines,setLines]=useState([{command:"",output:"HAJI OS v1.0\nA small window into my world. Type help to begin."}]);
  const [history,setHistory]=useState<string[]>([]);
  const historyIndex=useRef(-1);
  const field=useRef<HTMLInputElement>(null);
  const output=useRef<HTMLDivElement>(null);
  useEffect(()=>{if(open)field.current?.focus();},[open]);
  useEffect(()=>{output.current?.scrollTo({top:output.current.scrollHeight});},[lines]);
  const run=(e:FormEvent)=>{
    e.preventDefault();const cmd=input.trim().toLowerCase();if(!cmd)return;
    setInput("");setHistory(h=>[cmd,...h].slice(0,30));historyIndex.current=-1;
    if(cmd==="clear"){setLines([]);return;}
    const answers:Record<string,string>={
      help:"help · whoami · projects · stack · universe · contact · now · clear\nKeyboard: ↑ previous command · Esc close",
      whoami:profile.name+"\nHAJIHAZ — Founder / Product builder / Law student\n"+profile.location,
      projects:projects.map(p=>p.name+" — "+p.status).join("\n"),
      stack:"Tools across the projects:\nNext.js · React · TypeScript · PostgreSQL · Go · Git · Vercel\nA toolbox, not a claim of mastery.",
      universe:domains.map(d=>d.label+" — "+d.note).join("\n"),
      contact:"GitHub: "+profile.github+"\nBusiness: https://allbeesolutions.com\nBusiness enquiries through AllBee.",
      now:currentFocus.map(f=>f.label+" — "+f.note).join("\n"),
    };
    setLines(l=>[...l,{command:cmd,output:answers[cmd]||"Unknown command. Type help to see what is available."}].slice(-40));
  };
  return <Dialog open={open} onClose={onClose} title="HAJI OS command interface">
    <div className="os-heading"><span className="signal-dot"/><span>HAJI OS</span><small>PUBLIC INTERFACE</small></div>
    <div className="os-output" ref={output} role="log" aria-live="polite">{lines.map((line,i)=><div key={i}>{line.command?<p className="os-command">&gt; {line.command}</p>:null}<pre>{line.output}</pre></div>)}</div>
    <form onSubmit={run} className="os-form"><span aria-hidden="true">→</span><label className="sr-only" htmlFor="os-command">Enter a command</label><input id="os-command" ref={field} value={input} onChange={e=>setInput(e.target.value)} placeholder="Type help…" autoComplete="off" spellCheck={false} onKeyDown={e=>{if(e.key==="ArrowUp"){e.preventDefault();historyIndex.current=Math.min(historyIndex.current+1,history.length-1);setInput(history[historyIndex.current]||"");}else if(e.key==="ArrowDown"){e.preventDefault();historyIndex.current=Math.max(historyIndex.current-1,-1);setInput(history[historyIndex.current]||"");}}}/><button type="submit" aria-label="Run command">Enter ↵</button></form>
    <div className="os-foot"><span>Local commands. No external execution.</span><kbd>Esc</kbd></div>
  </Dialog>;
}

function Lab({ paused }: { paused: boolean }) {
  const [seed,setSeed]=useState(1);
  const [noise,setNoise]=useState(55);
  const [pulse,setPulse]=useState(false);
  const pattern=Array.from({length:64},(_,i)=>{const n=Math.sin((i+seed*17)*12.9898)*43758.5453;return n-Math.floor(n)>0.48;});
  const chart=Array.from({length:40},(_,i)=>`${i*8},${70+Math.sin(i*.32)*25+Math.sin(i*4.7)*noise*.5}`).join(" ");
  return <div className="lab-grid">
    <article className="experiment"><div className="experiment-heading"><span>01 / GENERATIVE FORM</span><span>↗</span></div><div className="pattern-grid" role="img" aria-label={`Generated pattern ${seed}`}>{pattern.map((on,i)=><i key={i} className={on?"filled":""}/>)}</div><h3>A different arrangement.</h3><p>The same elements. Another possibility.</p><button className="text-button" onClick={()=>setSeed(s=>s+1)}>Generate a pattern <Arrow/></button></article>
    <article className="experiment"><div className="experiment-heading"><span>02 / SIGNAL & NOISE</span><span>↗</span></div><svg className="noise-chart" viewBox="0 0 320 150" aria-hidden="true"><path d="M0 37H320 M0 75H320 M0 113H320" stroke="#303338" strokeWidth=".6"/><polyline points={chart} fill="none" stroke="#c8bc9e" strokeWidth="1.5"/><path d="M0 70 C75 25 100 75 160 96 S255 35 320 64" fill="none" stroke="#ff5948" strokeWidth="2"/></svg><h3>Find what matters.</h3><p>Illustrative signal study, not market data.</p><label className="slider-label" htmlFor="noise">Noise <span>{noise}%</span></label><input id="noise" aria-label="Noise level" type="range" min="0" max="100" value={noise} onChange={e=>setNoise(Number(e.target.value))}/></article>
    <article className="experiment"><div className="experiment-heading"><span>03 / SYSTEM FLOW</span><span>↗</span></div><div className={`flow-demo ${pulse&&!paused?"sending":""}`} aria-hidden="true"><div>01</div><i/><div>02</div><i/><div>03</div><span className="flow-packet"/></div><h3>One action. A whole system.</h3><p>Interface → application → data.</p><button className="text-button" aria-pressed={pulse} onClick={()=>setPulse(p=>!p)}>{pulse?"Stop the flow":"Send a signal"} <Arrow/></button><span className="sr-only" role="status">{pulse?"Signal is moving through three system layers.":"Flow is paused."}</span></article>
  </div>;
}

export default function Portfolio() {
  const [menu,setMenu]=useState(false);
  const [active,setActive]=useState("");
  const [paused,setPaused]=useState(false);
  const [systemReduced,setSystemReduced]=useState(false);
  const [hero3D,setHero3D]=useState(false);
  const [intro,setIntro]=useState(false);
  const [scramble,setScramble]=useState("HAJIHAZ");
  const [selectedProject,setSelectedProject]=useState<Project|null>(null);
  const [projectIndex,setProjectIndex]=useState(0);
  const [domain,setDomain]=useState<DomainId|null>(null);
  const [layer,setLayer]=useState(0);
  const [os,setOs]=useState(false);
  const [copied,setCopied]=useState(false);
  const progress=useRef<HTMLDivElement>(null);
  const universe=useRef<HTMLElement>(null);
  const work=useRef<HTMLElement>(null);
  const [workNear,setWorkNear]=useState(false);
  const [universeNear,setUniverseNear]=useState(false);
  const chosen=featured[projectIndex];
  const selectedDomain=domains.find(d=>d.id===domain);
  const related=domain?projects.filter(p=>p.domains.includes(domain)):projects.slice(0,3);

  useEffect(()=>{
    const reduced=matchMedia("(prefers-reduced-motion: reduce)");
    setPaused(reduced.matches);setSystemReduced(reduced.matches);
    setHero3D(!matchMedia("(max-width:800px)").matches&&!reduced.matches);
    const change=()=>{setPaused(reduced.matches);setSystemReduced(reduced.matches);};reduced.addEventListener("change",change);
    let visited=true;
    try{visited=sessionStorage.getItem("hh-arrival-v2")==="seen";sessionStorage.setItem("hh-arrival-v2","seen");}catch{/* Privacy modes can still browse the full site. */}
    if(visited||reduced.matches)return()=>reduced.removeEventListener("change",change);
    setIntro(true);
    const start=performance.now();
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const scrambleTimer=setInterval(()=>{
      const ratio=Math.min((performance.now()-start)/720,1);
      setScramble("HAJIHAZ".split("").map((c,i)=>i<Math.floor(ratio*7)?c:chars[Math.floor(Math.random()*chars.length)]).join(""));
    },65);
    const end=setTimeout(()=>{clearInterval(scrambleTimer);setScramble("HAJIHAZ");setIntro(false);},1150);
    return()=>{clearInterval(scrambleTimer);clearTimeout(end);reduced.removeEventListener("change",change);};
  },[]);

  useEffect(()=>{
    let frame=0;
    const sections=Array.from(document.querySelectorAll<HTMLElement>("main>section[id]"));
    const update=()=>{
      frame=0;const available=document.documentElement.scrollHeight-innerHeight;
      progress.current?.style.setProperty("transform",`scaleX(${available>0?scrollY/available:0})`);
      const current=sections.filter(s=>s.getBoundingClientRect().top<=innerHeight*.35).at(-1);
      if(current)setActive(current.id);
    };
    const scroll=()=>{if(!frame)frame=requestAnimationFrame(update);};
    addEventListener("scroll",scroll,{passive:true});addEventListener("resize",scroll);update();
    const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)setActive(e.target.id);});},{rootMargin:"-15% 0px -65% 0px"});
    sections.forEach(el=>observer.observe(el));
    const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in-view");reveal.unobserve(e.target);}}),{rootMargin:"0px 0px -45px 0px"});
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach(el=>{if(el.getBoundingClientRect().top>innerHeight){el.classList.add("will-reveal");reveal.observe(el);}});
    const near=new IntersectionObserver(entries=>{if(entries[0].isIntersecting){setUniverseNear(true);near.disconnect();}},{rootMargin:"450px"});
    if(universe.current)near.observe(universe.current);
    const workObserver=new IntersectionObserver(entries=>{if(entries[0].isIntersecting){setWorkNear(true);workObserver.disconnect();}},{rootMargin:"350px"});
    if(work.current)workObserver.observe(work.current);
    const shortcut=(e:KeyboardEvent)=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();setSelectedProject(null);setOs(o=>!o);}};
    addEventListener("keydown",shortcut);
    return()=>{removeEventListener("scroll",scroll);removeEventListener("resize",scroll);removeEventListener("keydown",shortcut);cancelAnimationFrame(frame);observer.disconnect();near.disconnect();workObserver.disconnect();reveal.disconnect();};
  },[]);

  useEffect(()=>{if(!menu)return;const escape=(e:KeyboardEvent)=>{if(e.key==="Escape")setMenu(false);};addEventListener("keydown",escape);return()=>removeEventListener("keydown",escape);},[menu]);

  const openProject=(p:Project)=>{setOs(false);setSelectedProject(p);};
  const copyEmail=async()=>{
    if(!profile.email)return;
    try{await navigator.clipboard.writeText(profile.email);setCopied(true);setTimeout(()=>setCopied(false),2000);}catch{setCopied(false);}
  };

  return <div className="portfolio" data-paused={paused}>
    <a className="skip-link" href="#main">Skip to content</a>
    <div ref={progress} className="scroll-progress" aria-hidden="true"/>
    <div className={`arrival ${intro?"arrival-active":""}`} aria-hidden="true"><div><span className="signal-dot"/><p>{scramble.split("").map((c,i)=><span key={i} className={i===3?"red-letter":""}>{c}</span>)}</p><small>INITIALIZING THE UNBUILT<span> / 001</span></small></div></div>
    <header className="header">
      <a href="#home" className="wordmark" aria-label="HAJIHAZ home"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3V21H8V14H16V21H21V3H16V10H8V3Z" fill="currentColor"/><path d="M8 12H16" stroke="#ff503c" strokeWidth="1.4"/></svg><span>HAJIHAZ</span></a>
      <nav className={menu?"nav nav-open":"nav"} aria-label="Main navigation" id="mobile-nav">{nav.map(n=><a key={n.id} href={`#${n.id}`} aria-current={active===n.id?"location":undefined} onClick={()=>setMenu(false)}>{n.label}</a>)}</nav>
      <div className="header-actions"><button className="motion-button" aria-label={systemReduced?"Motion reduced":paused?"Resume motion":"Pause motion"} aria-pressed={paused} disabled={systemReduced} title={systemReduced?"Motion follows your system preference":paused?"Resume motion":"Pause motion"} onClick={()=>setPaused(p=>!p)}>{paused?<span aria-hidden="true">▷</span>:<span aria-hidden="true">Ⅱ</span>}</button><button className="os-trigger" aria-label="Open HAJI OS" onClick={e=>{e.currentTarget.focus();setOs(true);}}><span>⌘</span><span> K</span></button><button className="menu-toggle" aria-expanded={menu} aria-controls="mobile-nav" onClick={()=>setMenu(m=>!m)}>{menu?"Close":"Menu"}<span aria-hidden="true">{menu?"−":"+"}</span></button></div>
    </header>
    <main id="main">
      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="hero-grid" aria-hidden="true"/>
        <div className="hero-stage"><div className="core-static" aria-hidden="true"><span>H</span></div>{hero3D?<Sculpture paused={paused}/>:null}{!hero3D?<button className="core-interaction" onClick={()=>setHero3D(true)} aria-label="Explore the sculpture in 3D"><span>EXPLORE IN 3D</span><Arrow diagonal/></button>:null}<div className="core-caption"><span>FIG. 01 — THE HAJI CORE</span><span>TITANIUM / INTERCONNECTED SYSTEMS</span></div><div className="core-axis" aria-hidden="true"><span>Y</span><i/><b>H</b></div></div>
        <div className="hero-content"><div className="eyebrow"><span className="signal-dot"/> INDEPENDENT MIND. CONNECTED WORLDS.</div><h1 id="hero-title">BUILDING<br/>THE <span className="serif">UNBUILT.</span></h1><p className="hero-description">Technology. Business. Law. Capital.<br/><span>One person. One interconnected vision.</span></p><a className="pill-button" href="#work"><span>Explore the work</span><Arrow diagonal/></a><div className="hero-person"><span className="small-rule"/><p>SYED HASAN KUDDOS SAHIB<br/><span>Founder / Product builder / Law student</span></p></div></div>
        <div className="hero-bottom"><a href="#identity" className="scroll-hint"><span className="scroll-line"/><span>SCROLL TO DISCOVER</span></a><span>TAMIL NADU, INDIA <i className="tiny-dot"/></span><span className="hero-edition">PERSONAL UNIVERSE / VOL. 01</span></div>
      </section>

      <section id="identity" className="identity paper" aria-labelledby="identity-title">
        <Label n="01" light>The person behind the systems</Label>
        <div className="identity-layout" data-reveal><h2 id="identity-title">ONE PERSON.<br/><span className="serif">Multiple worlds.</span></h2><div className="identity-copy"><p className="lead-copy">Curiosity is the connection.</p><p>I’m Haji — Syed Hasan Kuddos Sahib. A founder and product builder from Tamil Nadu, exploring what happens when technology, business and law start thinking together.</p><p>A BBA in Financial Services gave me one lens. Studying LL.B. (Hons), with a focus on corporate law, is giving me another. Building products is where those perspectives meet.</p><a className="text-button" href="#thinking">How I think <Arrow/></a></div></div>
        <div className="identity-foot"><span>FOUNDER & ENTREPRENEUR</span><span>PRODUCT BUILDER</span><span>LL.B. (HONS) STUDENT</span><span>ALWAYS LEARNING <Arrow diagonal/></span></div>
      </section>

      <section ref={work} id="work" className="work section-space" aria-labelledby="work-title">
        <Label n="02">Selected systems / a work in motion</Label>
        <div className="section-heading" data-reveal><h2 id="work-title">IDEAS ARE EASY.<br/><span className="serif">Systems are built.</span></h2><p>Different questions.<br/>One instinct to build.</p></div>
        <div className="project-tabs" role="group" aria-label="Choose a featured project">{featured.map((p,i)=><button key={p.id} className={projectIndex===i?"selected":""} aria-pressed={projectIndex===i} onClick={()=>setProjectIndex(i)}><span>0{i+1}</span>{p.name}</button>)}</div>
        <article className="featured-project" style={{"--project-color":chosen.color} as CSSProperties}>
          <div className="project-visual"><div className="project-grid"/><ProjectArt kind={chosen.world}/>{workNear?<Sculpture key={chosen.id} mode={chosen.world} paused={paused} className="project-sculpture"/>:null}<div className="project-visual-top"><span>WORLD / 0{projectIndex+1}</span><span>{chosen.category.split(" / ")[0].toUpperCase()}</span></div><div className="project-visual-bottom"><span>{chosen.name.toUpperCase()}</span><span>CONCEPTUAL SYSTEM VISUALIZATION</span></div></div>
          <div className="project-story" aria-live="polite"><span className="status"><i/>{chosen.status}</span><h3>{chosen.headline}</h3><p>{chosen.summary}</p><div className="project-meta"><span>{chosen.category}</span><span>{chosen.year}</span></div><button className="pill-button ghost" onClick={()=>openProject(chosen)}>Explore the system <Arrow diagonal/></button></div>
        </article>
        <div className="project-index">{featured.map((p,i)=><button key={p.id} className="project-row" style={{"--project-color":p.color} as CSSProperties} onClick={()=>openProject(p)} aria-label={`Read ${p.name} case study`}><span className="row-number">0{i+1}</span><div className="row-art"><ProjectArt kind={p.world} compact/></div><div className="row-title"><h3>{p.name}</h3><span>{p.category}</span></div><span className="row-status">{p.status}</span><span className="row-arrow" aria-hidden="true">↗</span></button>)}</div>
        <div className="additional-heading"><span>ALSO IN THE ORBIT</span><span>Every project has its own stage.</span></div><div className="additional-projects">{projects.filter(p=>!p.featured).map(p=><button key={p.id} onClick={()=>openProject(p)}><span className="status"><i/>{p.status}</span><h3>{p.name}<Arrow diagonal/></h3><p>{p.summary}</p><span className="mono">OPEN PROJECT / ↗</span></button>)}</div>
      </section>

      <section ref={universe} id="universe" className="universe section-space" aria-labelledby="universe-title">
        <Label n="03">The Haji universe</Label>
        <div className="section-heading" data-reveal><h2 id="universe-title">NOT SEPARATE.<br/><span className="serif">Connected.</span></h2><p>Eight perspectives.<br/>Select one. Follow the connections.</p></div>
        <div className="universe-layout">
          <div className="universe-map"><div className="universe-canvas">{universeNear?<Sculpture mode="universe" selected={domain?domains.findIndex(d=>d.id===domain):-1} onSelect={i=>setDomain(domains[i].id)} paused={paused}/>:<ProjectArt kind="network"/>}</div><button className="universe-center" onClick={()=>setDomain(null)} aria-label="Return to the central universe"><span>HH</span><small>HAJIHAZ</small></button>{domains.map((d,i)=><button key={d.id} className={`domain-node node-${i} ${domain===d.id?"node-selected":""}`} aria-pressed={domain===d.id} onClick={()=>setDomain(d.id)}><span className="node-dot"/><span>{d.label}</span><small>0{i+1}</small></button>)}<div className="map-caption">SELECT A WORLD / FOLLOW THE CONNECTIONS</div></div>
          <div className="domain-panel" aria-live="polite"><span className="eyebrow">{selectedDomain?selectedDomain.note:"ONE INTERCONNECTED VISION"}</span><h3>{selectedDomain?selectedDomain.label:"Everything connects."}</h3><p>{selectedDomain?selectedDomain.description:"An idea becomes a product. A product becomes a business. Every system is shaped by the disciplines around it."}</p><div className="related-projects">{related.length?related.map(p=><button key={p.id} onClick={()=>openProject(p)}><span>{p.name}<small>{p.status}</small></span><Arrow diagonal/></button>):<a href={domain==="law"?"#thinking":"#markets"}><span>{domain==="law"?"Explore the legal perspective":"Explore capital & markets"}</span><Arrow diagonal/></a>}</div>{domain?<button className="text-button reset-domain" onClick={()=>setDomain(null)}>Back to the center <Arrow/></button>:null}</div>
        </div>
      </section>

      <section id="builder" className="builder section-space" aria-labelledby="builder-title">
        <Label n="04">Builder mode</Label>
        <div className="builder-layout" data-reveal><div><h2 id="builder-title">BEYOND<br/><span className="serif">the interface.</span></h2><p className="section-copy">I don’t just imagine systems. I build them — layer by layer, question by question, learning through the work.</p><div className="builder-footnote">TOOLS ACROSS MY PROJECTS<br/>Not a claim to know everything.</div></div><div className="architecture"><div className="architecture-top"><span>HH / SYSTEM ARCHITECTURE</span><span className="signal-dot"/></div><div className="layers" role="group" aria-label="Explore the architecture layers">{layers.map((l,i)=><button key={l.label} onClick={()=>setLayer(i)} className={layer===i?"layer-selected":""} aria-pressed={layer===i}><span>0{i+1}</span><b>{l.label}</b><small>{l.tech}</small><i aria-hidden="true">↗</i></button>)}</div><div className="layer-detail" aria-live="polite"><h3>{layers[layer].title}</h3><p>{layers[layer].copy}</p></div><div className="architecture-footer"><span>INTERFACE → INFRASTRUCTURE</span><span>05 CONNECTED LAYERS</span></div></div></div>
      </section>

      <section id="thinking" className="thinking paper section-space" aria-labelledby="thinking-title">
        <Label n="05" light>Technology × business × law</Label>
        <div className="thinking-heading" data-reveal><h2 id="thinking-title">THINKING<br/><span className="serif">across disciplines.</span></h2><span className="thinking-cross" aria-hidden="true">×</span></div>
        <div className="discipline-grid" data-reveal><article><span>01 / POSSIBILITY</span><h3>Technology.</h3><p>Build what can exist.<br/>Turn a question into a useful tool.</p></article><article><span>02 / PURPOSE</span><h3>Business.</h3><p>Understand why it should exist.<br/>Connect the product to a real need.</p></article><article><span>03 / RESPONSIBILITY</span><h3>Law.</h3><p>Think about how it should exist.<br/>Structure, governance and accountability.</p></article></div>
        <div className="thinking-note"><span>THE CONNECTION IS THE ADVANTAGE.</span><p>Currently studying LL.B. (Hons), with a focus on corporate law.</p></div>
      </section>

      <section id="markets" className="markets section-space" aria-labelledby="markets-title">
        <Label n="06">Capital & markets</Label>
        <div className="market-layout" data-reveal><div><div className="market-small">CONTEXT / RISK / PATIENCE</div><h2 id="markets-title">DECISIONS<br/><span className="serif">over noise.</span></h2><p className="section-copy">Financial markets reward context, discipline and a clear view of risk. I’m interested in the process behind a decision, not just the outcome.</p><span className="market-disclaimer">A PERSPECTIVE ON MARKETS. NO PERFORMANCE CLAIMS.</span></div><div className="market-desk"><div className="desk-head"><span>HH / A DECISION FRAMEWORK</span><span>01—05</span></div><div className="market-graph" aria-hidden="true"><svg viewBox="0 0 500 200"><defs><linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#c2aa78" stopOpacity=".2"/><stop offset="1" stopColor="#c2aa78" stopOpacity="0"/></linearGradient></defs><path d="M0 165 C40 145 50 165 90 123 S140 156 175 109 S230 145 265 91 S315 101 340 68 S395 105 425 44 S468 64 500 20 L500 200 H0Z" fill="url(#chart-fill)"/><path d="M0 165 C40 145 50 165 90 123 S140 156 175 109 S230 145 265 91 S315 101 340 68 S395 105 425 44 S468 64 500 20" fill="none" stroke="#c9b68d" strokeWidth="1.5"/><path d="M0 50 H500 M0 100 H500 M0 150 H500" stroke="#343539" strokeWidth=".5"/></svg><span>CONCEPTUAL VISUALIZATION / NOT MARKET DATA</span></div><div className="market-principles">{[["Signal","Separate evidence from distraction."],["Risk","Understand what could go wrong."],["Context","Zoom out before deciding."],["Timing","Patience is part of the process."],["Discipline","Let the process guide the decision."]].map(([a,b],i)=><div key={a}><span>0{i+1}</span><b>{a}</b><p>{b}</p></div>)}</div></div></div>
      </section>

      <section id="lab" className="lab section-space" aria-labelledby="lab-title">
        <Label n="07">Haji Lab / small questions, working experiments</Label>
        <div className="section-heading" data-reveal><h2 id="lab-title">ALWAYS<br/><span className="serif">experimenting.</span></h2><p>A little curiosity goes a long way.<br/>Try something.</p></div><Lab paused={paused}/>
      </section>

      <section id="journey" className="journey section-space" aria-labelledby="journey-title">
        <Label n="08">The journey</Label>
        <div className="section-heading" data-reveal><h2 id="journey-title">A DIFFERENT<br/><span className="serif">kind of path.</span></h2><p>Learn. Build. Reconsider.<br/>Keep moving.</p></div><div className="timeline" data-reveal>{timeline.map((t,i)=><article key={t.year}><div className="timeline-year"><span>{t.year}</span><i aria-hidden="true"/></div><small>0{i+1} / {t.tag}</small><h3>{t.title}</h3><p>{t.copy}</p></article>)}</div>
      </section>

      <section id="now" className="now section-space" aria-labelledby="now-title">
        <Label n="09">Right now / updated {profile.updated}</Label>
        <div className="now-layout" data-reveal><div><span className="eyebrow"><span className="signal-dot"/> AN ONGOING PROCESS</span><h2 id="now-title">CURRENTLY<br/><span className="serif">building.</span></h2><p className="section-copy">Focused on useful products, better systems and the next question worth asking.</p></div><div className="focus-list">{currentFocus.map((f,i)=>f.project?<button key={f.label} onClick={()=>openProject(projects.find(p=>p.id===f.project)!)}><span>0{i+1}</span><div><h3>{f.label}</h3><p>{f.note}</p></div><Arrow diagonal/></button>:<a key={f.label} href="#thinking"><span>0{i+1}</span><div><h3>{f.label}</h3><p>{f.note}</p></div><Arrow diagonal/></a>)}</div></div>
      </section>

      <section id="contact" className="contact" aria-labelledby="contact-title">
        <div className="contact-orbit" aria-hidden="true"><svg viewBox="0 0 800 800"><circle cx="400" cy="400" r="320"/><circle cx="400" cy="400" r="240"/><circle cx="400" cy="400" r="160"/><path d="M0 400H800 M400 0V800"/><circle className="orbit-red" cx="640" cy="400" r="5"/></svg></div>
        <Label n="10">The next connection</Label>
        <div className="contact-content" data-reveal><p className="contact-prelude">THE BEST WORK IS STILL AHEAD.</p><h2 id="contact-title">LET’S BUILD<br/><span className="serif">something that matters.</span></h2><p>Good things begin with a conversation.</p><div className="contact-links"><a className="pill-button" href="https://allbeesolutions.com" target="_blank" rel="noopener noreferrer">Connect through AllBee <Arrow diagonal/></a><a className="text-button" href={profile.github} target="_blank" rel="noopener noreferrer">Find me on GitHub <Arrow diagonal/></a>{profile.email?<><a className="text-button email-link" href={`mailto:${profile.email}`} aria-label="Email AllBee">{profile.email} <Arrow diagonal/></a><button className="text-button copy-email" onClick={copyEmail} aria-label="Copy business email">{copied?"Copied ✓":"Copy email"}</button><span className="sr-only" role="status">{copied?"Business email copied to clipboard":""}</span></>:null}</div></div>
        <div className="closing-brand" aria-hidden="true">HAJIHAZ<span>✳</span></div>
        <footer><div><span>© 2026 HAJIHAZ</span><span>BUILDING THE UNBUILT.</span></div><div><button onClick={e=>{e.currentTarget.focus();setOs(true);}}>HAJI OS <kbd>⌘ K</kbd></button><a href="#home">Back to the beginning ↑</a></div></footer>
      </section>
    </main>
    <HajiOS open={os} onClose={()=>setOs(false)}/>
    <Dialog open={!!selectedProject} title={selectedProject?selectedProject.name+" case study":"Project case study"} onClose={()=>setSelectedProject(null)} wide>{selectedProject?<div className="case-study" style={{"--project-color":selectedProject.color} as CSSProperties}><span className="case-label">SELECTED SYSTEM / {selectedProject.category.toUpperCase()}</span><h2>{selectedProject.name}</h2><p className="case-headline">{selectedProject.headline}</p><span className="status"><i/>{selectedProject.status}</span><div className="case-art"><ProjectArt kind={selectedProject.world}/></div><div className="case-grid">{[["01 / THE IDEA",selectedProject.idea],["02 / THE SYSTEM",selectedProject.system],["03 / THE BUILD",selectedProject.build],["04 / THE CHALLENGE",selectedProject.challenge],["05 / THE STATUS",selectedProject.status],["06 / WHAT’S NEXT",selectedProject.next]].map(([title,copy])=><article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div>{selectedProject.href?<a className="pill-button ghost" href={selectedProject.href} target="_blank" rel="noopener noreferrer">{selectedProject.linkLabel} <Arrow diagonal/></a>:null}<p className="case-note">The visual is an original interpretation of the system.</p></div>:null}</Dialog>
  </div>;
}
