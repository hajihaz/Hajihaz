import type { WorldKind } from "../content/site";

export default function ProjectArt({ kind, compact = false }: { kind: WorldKind; compact?: boolean }) {
  const lines = Array.from({ length: compact ? 6 : 12 }, (_, i) => i);
  return <svg viewBox="0 0 600 400" className={`project-art art-${kind}`} aria-hidden="true">
    <defs><linearGradient id={`metal-${kind}-${compact}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#e8e2d5"/><stop offset=".44" stopColor="#747d86"/><stop offset=".55" stopColor="#d7d3c8"/><stop offset="1" stopColor="#272c31"/></linearGradient></defs>
    <g fill="none" stroke="currentColor" strokeWidth=".8" opacity=".35">
      {lines.map(i=><path key={i} d={`M${i*60} 0 V400 M0 ${i*45} H600`}/>)}
    </g>
    {kind==="network"?<g>{Array.from({length:12},(_,i)=>{const a=i/12*Math.PI*2,x=300+Math.sin(a)*160,y=200+Math.cos(a)*110;return <g key={i}><path d={`M300 200 L${x} ${y}`} stroke="currentColor" strokeWidth="1"/><circle cx={x} cy={y} r="6" fill="var(--bg)" stroke="currentColor"/></g>;})}<path d="M300 150 L342 176 V224 L300 250 L258 224 V176 Z" fill="#292b2e" stroke="currentColor"/><path d="M258 176 L300 201 L342 176 M300 201 V250" stroke="currentColor" fill="none"/></g>
    :kind==="commerce"?<g transform="translate(300 205)"><path d="M-190 0 L0 -95 L190 0 L0 95Z" fill="none" stroke="currentColor"/>{[-95,0,95].map((x,i)=><g key={x} transform={`translate(${x} ${i===1?-35:18})`}><path d="M0 -45 L43 -22 V28 L0 53 L-43 28 V-22Z" fill="#30372f" stroke="currentColor"/><path d="M-43 -22 L0 3 L43 -22 M0 3 V53" fill="none" stroke="currentColor"/><path d="M-12 -38 L32 -13" stroke="#141814" strokeWidth="8"/></g>)}</g>
    :kind==="protocol"?<g>{Array.from({length:5},(_,i)=>{const x=130+i*85,y=220+Math.sin(i)*40;return <g key={i}><path d={`M${x} ${y} L${x+85} ${220+Math.sin(i+1)*40}`} stroke="currentColor"/><path d={`M${x} ${y-38} L${x+33} ${y-19} V${y+19} L${x} ${y+38} L${x-33} ${y+19} V${y-19}Z`} fill="#282f38" stroke="currentColor"/><path d={`M${x-33} ${y-19} L${x} ${y} L${x+33} ${y-19} M${x} ${y} V${y+38}`} fill="none" stroke="currentColor"/></g>;})}</g>
    :kind==="architecture"?<g>{Array.from({length:10},(_,i)=><path key={i} d={`M${160+i*28} 92 L${176+i*28} 83 V290 L${160+i*28} 300Z`} fill={`url(#metal-${kind}-${compact})`} stroke="currentColor" strokeWidth=".3"/>)}<path d="M135 315 L462 297" stroke="currentColor"/></g>
    :kind==="civic"?<g transform="translate(300 190) rotate(-27) skewX(25)">{Array.from({length:7},(_,i)=><path key={i} d={`M${i*48-145} -130 V130 M-145 ${i*43-130} H145`} stroke="currentColor" strokeWidth="2"/>)}{[[0,0],[-95,43],[95,-43],[48,86]].map(([x,y],i)=><rect key={i} x={x-15} y={y-14} width="30" height="28" fill="#47513f"/>)}<circle r="12" fill="#ff503c"/><circle r="24" fill="none" stroke="#ff503c"/></g>
    :<g transform="translate(300 200)">{[45,68,92,120].map((r,i)=><ellipse key={r} rx={r} ry={r*.7} transform={`rotate(${i*40})`} fill="none" stroke="currentColor" strokeWidth={i===0?8:2}/>)}<circle r="13" fill="#ff503c"/></g>}
  </svg>;
}
