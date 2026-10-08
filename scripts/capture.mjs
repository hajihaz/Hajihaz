import { chromium, webkit } from "playwright";
import { writeFile } from "node:fs/promises";
const observations=[];
for(const [name,engine,viewport] of [["desktop",chromium,{width:1440,height:1000}],["mobile",webkit,{width:390,height:844}]]){
 const browser=await engine.launch({headless:true});
 const page=await browser.newPage({viewport});
 const errors=[];
 page.on("pageerror",e=>errors.push(e.message));
 page.on("console",m=>{if(m.type()==="error")errors.push(m.text());});
 await page.addInitScript(()=>sessionStorage.setItem("hh-arrival-v2","seen"));
 await page.goto(process.env.PORTFOLIO_URL||"http://127.0.0.1:3013");
 if(name==="desktop")await page.locator(".hero .sculpture.is-ready").waitFor();
 await page.getByRole("button",{name:"Pause motion"}).click();
 await page.screenshot({path:".ai/raw/"+name+"-hero.jpg",type:"jpeg",quality:80,animations:"disabled"});
 for(const id of ["identity","work","universe","thinking","lab","contact"]){
  await page.locator("#"+id).scrollIntoViewIfNeeded();
  if(id==="universe")await page.locator("#universe .sculpture.is-ready").waitFor();
  if(id==="work")await page.locator("#work .sculpture.is-ready").waitFor();
  await page.screenshot({path:".ai/raw/"+name+"-"+id+".jpg",type:"jpeg",quality:80,animations:"disabled"});
 }
 observations.push({name,errors,renderers:await page.locator(".sculpture").evaluateAll(els=>els.map(e=>e.getAttribute("data-renderer"))),layout:await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth})),heading:await page.locator("h1").innerText()});
 await browser.close();
}
await writeFile(".ai/raw/visual-observations.json",JSON.stringify(observations,null,2));
console.log(JSON.stringify(observations));
