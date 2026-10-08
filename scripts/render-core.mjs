import { chromium } from "playwright";import sharp from "sharp";
const browser=await chromium.launch();const context=await browser.newContext({viewport:{width:1440,height:1000}});const p=await context.newPage();
await p.addInitScript(()=>sessionStorage.setItem("hh-arrival-v2","seen"));await p.goto("http://127.0.0.1:3013");
await p.locator(".hero .sculpture.is-ready").waitFor();await p.getByRole("button",{name:"Pause motion"}).click();
await p.locator(".hero-content,.hero-bottom,.core-caption,.core-axis").evaluateAll(els=>els.forEach(el=>el.style.visibility="hidden"));
const buffer=await p.locator(".hero canvas").screenshot({type:"png",omitBackground:true,animations:"disabled"});
await sharp(buffer).resize({width:900,withoutEnlargement:true}).webp({quality:85,alphaQuality:95}).toFile("public/core-still.webp");
console.log(await sharp("public/core-still.webp").metadata());
await browser.close();
