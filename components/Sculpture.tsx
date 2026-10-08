"use client";

import { useEffect, useRef, useState } from "react";
import type { WorldKind } from "../content/site";
import ProjectArt from "./ProjectArt";

type Props = { mode?: "core" | "universe" | WorldKind; selected?: number; className?: string; paused?: boolean; onSelect?: (index: number) => void };

export default function Sculpture({ mode = "core", selected = -1, className = "", paused = false, onSelect }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const selectedRef = useRef(selected);
  const pausedRef = useRef(paused);
  const selectRef = useRef(onSelect);
  const [ready, setReady] = useState(false);
  useEffect(() => { selectedRef.current = selected; }, [selected]);
  useEffect(() => { pausedRef.current = paused; }, [paused]);
  useEffect(() => { selectRef.current = onSelect; }, [onSelect]);

  useEffect(() => {
    let gone = false;
    let release: (() => void) | undefined;
    const parent = host.current;
    if (!parent) return;
    setReady(false);

    const boot = async () => {
      const T = await import("three");
      if (gone) return;
      const reduced = matchMedia("(prefers-reduced-motion: reduce)");
      let renderer: import("three").WebGLRenderer;
      try { renderer = new T.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" }); }
      catch { return; }
      if (gone) { renderer.dispose(); return; }
      const canvas = renderer.domElement;
      canvas.setAttribute("aria-hidden", "true");
      canvas.style.touchAction = "pan-y";
      parent.appendChild(canvas);
      renderer.setPixelRatio(Math.min(devicePixelRatio, innerWidth < 700 ? 1.35 : 1.65));
      renderer.outputColorSpace = T.SRGBColorSpace;
      renderer.toneMapping = T.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.35;
      const scene = new T.Scene();
      const camera = new T.PerspectiveCamera(36, 1, 0.1, 80);
      camera.position.set(0, 0.25, mode === "universe" ? 11 : 8);
      const group = new T.Group();
      scene.add(group);

      // A procedural studio environment: no remote textures or video downloads.
      const studio = document.createElement("canvas");
      studio.width = 1024; studio.height = 512;
      const ctx = studio.getContext("2d")!;
      const gradient = ctx.createLinearGradient(0, 0, 0, 512);
      gradient.addColorStop(0, "#454750"); gradient.addColorStop(0.5, "#111217"); gradient.addColorStop(1, "#08090b");
      ctx.fillStyle = gradient; ctx.fillRect(0, 0, 1024, 512);
      ctx.fillStyle = "#fff7e7"; ctx.fillRect(60, 70, 130, 240); ctx.fillStyle = "#ccd8e8"; ctx.fillRect(640, 60, 65, 300);
      ctx.fillStyle = "#ffffff"; ctx.fillRect(280, 15, 450, 22);
      ctx.fillStyle = "#d34734"; ctx.fillRect(950, 130, 35, 210);
      const makeEnvironment=()=>{
        const texture=new T.CanvasTexture(studio);texture.mapping=T.EquirectangularReflectionMapping;texture.colorSpace=T.SRGBColorSpace;
        const pmrem=new T.PMREMGenerator(renderer);const result=pmrem.fromEquirectangular(texture);texture.dispose();pmrem.dispose();return result;
      };
      let env=makeEnvironment();scene.environment=env.texture;

      const metal = new T.MeshStandardMaterial({ color: "#d7d6d1", metalness: 0.98, roughness: 0.23, envMapIntensity: 1.8 });
      const dark = new T.MeshStandardMaterial({ color: "#24272b", metalness: 0.9, roughness: 0.3, envMapIntensity: 1.3 });
      const red = new T.MeshStandardMaterial({ color: "#ff4d3a", emissive: "#f03928", emissiveIntensity: 1.6, metalness: 0.4, roughness: 0.35 });
      const gold = new T.MeshStandardMaterial({ color: "#dac098", metalness: 0.9, roughness: 0.28 });
      const blue = new T.MeshStandardMaterial({ color: "#afc4dc", metalness: 0.78, roughness: 0.28 });
      const green = new T.MeshStandardMaterial({ color: "#a9bf9f", metalness: 0.75, roughness: 0.28 });
      const materials: import("three").Material[] = [metal, dark, red, gold, blue, green];
      scene.add(new T.HemisphereLight("#f5eee1", "#252731", 2.5));
      const key = new T.DirectionalLight("#fff1de", 4.2); key.position.set(-3, 5, 5); scene.add(key);
      const rim = new T.DirectionalLight("#aac2e4", 3); rim.position.set(5, 2, -2); scene.add(rim);
      const redLight = new T.PointLight("#ff402c", 18, 8); redLight.position.set(-3, -1, 1); scene.add(redLight);
      const objects: import("three").Object3D[] = [];
      const nodes: import("three").Mesh[] = [];
      const accents: import("three").Mesh[] = [];
      const geometries: import("three").BufferGeometry[] = [];
      const add = (geometry: import("three").BufferGeometry, mat: import("three").Material, pos: number[] = [0,0,0], target: import("three").Object3D = group) => {
        geometries.push(geometry);
        const mesh = new T.Mesh(geometry, mat); mesh.position.set(pos[0], pos[1], pos[2]); target.add(mesh); return mesh;
      };
      const box = (w: number, h: number, d: number, mat: import("three").Material, pos: number[] = [0,0,0], target: import("three").Object3D = group) => add(new T.BoxGeometry(w,h,d), mat, pos, target);
      const link = (a: import("three").Vector3, b: import("three").Vector3, color = "#72757c", target: import("three").Object3D = group) => {
        const geo = new T.BufferGeometry().setFromPoints([a,b]); geometries.push(geo);
        const mat = new T.LineBasicMaterial({ color, transparent: true, opacity: 0.42 }); materials.push(mat);
        const line = new T.Line(geo,mat); target.add(line); return line;
      };
      const bevel = (w: number, h: number, mat: import("three").Material, pos: number[], depth = 0.46) => {
        const shape = new T.Shape(); const r = 0.07;
        shape.moveTo(-w/2+r,-h/2); shape.lineTo(w/2-r,-h/2); shape.quadraticCurveTo(w/2,-h/2,w/2,-h/2+r);
        shape.lineTo(w/2,h/2-r); shape.quadraticCurveTo(w/2,h/2,w/2-r,h/2); shape.lineTo(-w/2+r,h/2);
        shape.quadraticCurveTo(-w/2,h/2,-w/2,h/2-r); shape.lineTo(-w/2,-h/2+r); shape.quadraticCurveTo(-w/2,-h/2,-w/2+r,-h/2);
        const geo = new T.ExtrudeGeometry(shape,{depth,bevelEnabled:true,bevelThickness:0.07,bevelSize:0.065,bevelSegments:4,steps:1,curveSegments:6}); geo.center();
        return add(geo,mat,pos);
      };

      if (mode === "core") {
        bevel(0.61, 2.35, metal, [-0.87,0,0]); bevel(0.61, 2.35, metal, [0.87,0,0]);
        bevel(1.36, 0.5, dark, [0,0,-0.08], 0.55);
        bevel(1.28, 0.075, red, [0,0,0.29], 0.055);
        // Recessed rails, contrasting end caps and a second floating layer.
        for (const x of [-0.87,0.87]) {
          box(0.39,0.04,0.025, dark,[x,0.97,0.31]); box(0.39,0.04,0.025,dark,[x,-0.97,0.31]);
          for(let j=0;j<7;j++) box(0.22,0.013,0.025,dark,[x,0.74-j*0.09,0.315]);
          box(0.075,1.82,0.085,dark,[x-0.34,0,-0.14]);
        }
        const orbit = add(new T.TorusGeometry(1.87,0.018,8,150,Math.PI*1.7),gold); orbit.rotation.set(0.25,-0.35,0.3);
        const orbit2=add(new T.TorusGeometry(2.05,0.008,6,130,Math.PI*1.25),metal); orbit2.rotation.set(0.8,0.45,-0.65);
        const base=add(new T.TorusGeometry(1.72,0.11,10,100),dark,[0,0,-0.8]);
        base.scale.y=1.05;
        for(let i=0;i<24;i++) {
          const a=i/24*Math.PI*2;
          const tick=box(0.025,i%6===0?0.15:0.07,0.025,i%6===0?gold:dark,[Math.sin(a)*2.15,Math.cos(a)*2.15,-0.55]); tick.rotation.z=-a;
        }
        const dot=add(new T.SphereGeometry(0.055,12,8),red,[1.77,0.65,0.35]); accents.push(dot);
        group.rotation.set(0.14,-0.5,-0.17); group.scale.setScalar(1.28);
        objects.push(orbit,orbit2);
      } else if (mode === "universe" || mode === "network") {
        const count = mode === "universe" ? 8 : 12;
        const center=add(new T.IcosahedronGeometry(mode==="universe"?0.5:0.6,1),mode==="universe"?metal:gold);
        const wire=new T.LineSegments(new T.EdgesGeometry(center.geometry),new T.LineBasicMaterial({color:"#f2dec0",transparent:true,opacity:0.55})); center.add(wire);
        geometries.push(wire.geometry); materials.push(wire.material);
        const pts=[];
        for(let i=0;i<count;i++) {
          const a=i/count*Math.PI*2;
          const p=new T.Vector3(Math.sin(a)*2.65,Math.cos(a)*1.8,Math.sin(a*2)*0.48); pts.push(p);
          const node=add(new T.OctahedronGeometry(0.14,0),i===0?red:metal,[p.x,p.y,p.z]); node.userData.index=i; nodes.push(node);
          link(new T.Vector3(),p);
          if(i>0)link(p,pts[i-1], "#bba586");
        }
        link(pts[0],pts[count-1], "#bba586");
        for (const r of [1,2.1]) {
          const ring=add(new T.TorusGeometry(r,0.006,5,100),dark); ring.rotation.x=0.4; objects.push(ring);
        }
        group.rotation.set(0.15,0,0);
      } else if (mode === "commerce") {
        const hub=box(0.6,0.65,0.6,green,[0,0,0]); objects.push(hub);
        for(let i=0;i<7;i++) {
          const a=i/7*Math.PI*2;
          const p=new T.Vector3(Math.sin(a)*2.1,(i%2-0.5)*1.3,Math.cos(a)*1.4);
          const parcel=box(0.48,0.48,0.48,i%3===0?green:metal,[p.x,p.y,p.z]); parcel.rotation.y=a;
          const tape=box(0.1,0.49,0.49,dark,[0,0,0],parcel); tape.userData.decoration=true;
          nodes.push(parcel); link(new T.Vector3(),p);
          const bead=add(new T.SphereGeometry(0.06,10,6),green); bead.userData.path=p; accents.push(bead);
        }
        group.rotation.set(0.5,-0.55,0.1);
      } else if (mode === "protocol") {
        for(let i=0;i<6;i++) {
          const p=new T.Vector3((i-2.5)*0.8,Math.sin(i*0.85)*0.65,Math.cos(i*0.85)*0.35);
          const block=box(0.54,0.54,0.54,i%2===0?blue:dark,[p.x,p.y,p.z]); block.rotation.set(0.35,0.45,0.1); nodes.push(block);
          const edges=new T.LineSegments(new T.EdgesGeometry(block.geometry),new T.LineBasicMaterial({color:"#bed0e6",transparent:true,opacity:0.7})); block.add(edges);
          geometries.push(edges.geometry); materials.push(edges.material);
          if(i>0)link(nodes[i-1].position,p,"#bed0e6");
        }
        group.rotation.set(0.15,-0.35,-0.12);
      } else if (mode === "architecture") {
        for(let i=0;i<9;i++) {
          const beam=box(0.1,2.6,0.1,i%3===0?gold:metal,[(i-4)*0.4,0,-Math.abs(i-4)*0.2]); nodes.push(beam);
          box(0.42,0.08,0.3,dark,[(i-4)*0.4,1.34,-Math.abs(i-4)*0.2]);
        }
        box(3.7,0.12,1.5,dark,[0,-1.4,-0.35]);
        group.rotation.set(0.15,-0.38,0);
      } else if (mode === "civic") {
        const lineMat=new T.MeshStandardMaterial({color:"#a7bc9b",emissive:"#627755",emissiveIntensity:0.15,metalness:0.5,roughness:0.4}); materials.push(lineMat);
        for(let i=-3;i<=3;i++) {
          box(0.055,0.025,4,lineMat,[i*0.62,-0.55,0]);
          box(4,0.025,0.055,lineMat,[0,-0.55,i*0.62]);
        }
        for(let i=0;i<15;i++) {
          const x=((i*7)%6-2.5)*0.62+0.25; const z=((i*3)%5-2)*0.62+0.25; const h=0.22+(i%4)*0.17;
          box(0.27,h,0.27,i%4===0?green:dark,[x,-0.55+h/2,z]);
        }
        const beacon=add(new T.ConeGeometry(0.08,0.3,16),red,[0.88,0.12,0.85]); beacon.rotation.z=Math.PI; accents.push(beacon);
        group.rotation.set(0.65,-0.48,0.03);
      } else {
        for(let i=0;i<5;i++) {
          const ring=add(new T.TorusGeometry(0.5+i*0.22,0.05,10,80),i%2===0?blue:metal); ring.rotation.set(i*0.35,i*0.42,i*0.25); objects.push(ring);
        }
        add(new T.SphereGeometry(0.25,24,16),red);
      }

      let pointerX=0,pointerY=0,visible=false,contextLost=false,frame=0,last=0,elapsed=0;
      const raycaster=new T.Raycaster();
      const pointer=new T.Vector2();
      const move=(e:PointerEvent) => {
        const r=parent.getBoundingClientRect();
        pointerX=((e.clientX-r.left)/r.width-0.5)*2;
        pointerY=((e.clientY-r.top)/r.height-0.5)*2;
        if(mode==="universe") {
          pointer.set(pointerX,-pointerY); raycaster.setFromCamera(pointer,camera);
          canvas.style.cursor=raycaster.intersectObjects(nodes).length?"pointer":"default";
        }
        if(reduced.matches||pausedRef.current) draw(performance.now());
      };
      const pick=(e:PointerEvent)=>{
        if(mode!=="universe"||!selectRef.current)return;
        const r=parent.getBoundingClientRect(); pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);
        raycaster.setFromCamera(pointer,camera);
        const hit=raycaster.intersectObjects(nodes)[0]; if(hit)selectRef.current(hit.object.userData.index as number);
      };
      const resize=()=>{
        if(!parent.clientWidth||!parent.clientHeight)return;
        renderer.setSize(parent.clientWidth,parent.clientHeight,false);
        camera.aspect=parent.clientWidth/parent.clientHeight;
        camera.position.z=mode==="universe"?11:(parent.clientWidth/parent.clientHeight<0.9?10:8);
        camera.updateProjectionMatrix();
        renderer.render(scene,camera);
      };
      const draw=(now:number)=>{
        frame=0;
        if(gone||contextLost||!visible||document.hidden)return;
        const animate=!reduced.matches&&!pausedRef.current;
        const targetInterval=innerWidth<700?1000/30:1000/60;
        if(animate&&now-last<targetInterval){frame=requestAnimationFrame(draw);return;}
        const dt=Math.min((now-last)/1000,0.05); last=now;
        if(animate)elapsed+=dt;
        const scroll=mode==="core"?Math.max(-1,Math.min(1,parent.getBoundingClientRect().top/innerHeight)):0;
        if(mode==="core"&&animate){const baseZ=camera.aspect<.9?10:8;camera.position.z+=(baseZ+Math.max(0,-scroll)*.8-camera.position.z)*.04;}
        const targetX=(mode==="civic"?0.65:mode==="commerce"?0.5:0.14)+(animate?pointerY*0.09:0);
        const targetY=(mode==="universe"?0:mode==="core"?-0.5:-0.35)+(animate?pointerX*0.17+scroll*0.1:0);
        group.rotation.x+=(targetX-group.rotation.x)*0.05; group.rotation.y+=(targetY-group.rotation.y)*0.05;
        if(animate) {
          group.position.y=Math.sin(elapsed*0.5)*0.06;
          if(mode==="core") { objects[0].rotation.z=0.3+elapsed*0.032; objects[1].rotation.z=-0.65-elapsed*0.02; }
          if(mode==="ai")objects.forEach((o,i)=>{o.rotation.z=elapsed*0.08+i*0.25;});
          if(mode==="commerce")accents.forEach((o,i)=>{const p=o.userData.path; const t=(elapsed*0.13+i/7)%1; o.position.copy(p).multiplyScalar(t);});
        }
        if(mode==="universe")nodes.forEach((n,i)=>{n.material=i===selectedRef.current?red:metal; n.scale.setScalar(i===selectedRef.current?1.65:1);});
        renderer.render(scene,camera);
        if(animate) frame=requestAnimationFrame(draw);
      };
      const wake=()=>{ if(!frame&&!gone&&!contextLost&&visible&&!document.hidden) {last=performance.now();frame=requestAnimationFrame(draw);} };
      const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)wake();else{cancelAnimationFrame(frame);frame=0;}},{rootMargin:"100px"});
      intersection.observe(parent);
      const observer=new ResizeObserver(resize); observer.observe(parent);
      const lost=(e:Event)=>{e.preventDefault();contextLost=true;cancelAnimationFrame(frame);frame=0;setReady(false);};
      const restored=()=>{contextLost=false;env.dispose();env=makeEnvironment();scene.environment=env.texture;resize();setReady(true);wake();};
      const visibility=()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else wake();};
      const motion=()=>wake();
      parent.addEventListener("pointermove",move,{passive:true});
      parent.addEventListener("pointerup",pick);
      canvas.addEventListener("webglcontextlost",lost);canvas.addEventListener("webglcontextrestored",restored);
      document.addEventListener("visibilitychange",visibility);reduced.addEventListener("change",motion);
      const refresh=setInterval(()=>{if(visible)wake();},600);
      resize();setReady(true);
      release=()=>{
        clearInterval(refresh);cancelAnimationFrame(frame);observer.disconnect();intersection.disconnect();
        parent.removeEventListener("pointermove",move);parent.removeEventListener("pointerup",pick);
        canvas.removeEventListener("webglcontextlost",lost);canvas.removeEventListener("webglcontextrestored",restored);
        document.removeEventListener("visibilitychange",visibility);reduced.removeEventListener("change",motion);
        geometries.forEach(g=>g.dispose()); materials.forEach(m=>m.dispose());env.dispose();
        renderer.dispose();renderer.forceContextLoss();canvas.remove();
      };
    };
    void boot().catch(()=>{ /* The procedural HTML/SVG fallback remains visible. */ });
    return()=>{gone=true;release?.();};
  }, [mode]);

  return <div ref={host} className={`sculpture ${className} ${ready ? "is-ready" : ""}`} data-renderer={ready ? "webgl" : "fallback"}>
    <div className="sculpture-fallback" aria-hidden="true">
      {mode==="core"?<svg viewBox="0 0 600 600"><defs><linearGradient id="titanium" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f4efe3"/><stop offset=".3" stopColor="#65696e"/><stop offset=".5" stopColor="#d5d6d2"/><stop offset="1" stopColor="#262a30"/></linearGradient></defs><ellipse cx="300" cy="300" rx="220" ry="150" fill="none" stroke="#82755e" transform="rotate(-30 300 300)"/><ellipse cx="300" cy="300" rx="180" ry="230" fill="none" stroke="#34383c" transform="rotate(25 300 300)"/><path d="M180 185 L245 170 L245 265 L355 265 L355 170 L420 185 L420 415 L355 430 L355 330 L245 330 L245 430 L180 415 Z" fill="url(#titanium)" stroke="#9a9b96"/><path d="M246 293 H354" stroke="#ff503c" strokeWidth="5"/></svg>:<ProjectArt kind={mode==="universe"?"network":mode}/>}
    </div>
  </div>;
}
