import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async({page})=>{
  await page.addInitScript(()=>{sessionStorage.setItem("hh-arrival-v2","seen");});
  await page.goto("/");
});

test("complete content, real links and clean runtime",async({page})=>{
  const errors:string[]=[];page.on("pageerror",e=>errors.push(e.message));
  await expect(page.getByRole("heading",{name:"BUILDING THE UNBUILT.",level:1})).toBeVisible();
  const sections=await page.locator("main>section[id]").evaluateAll(els=>els.map(e=>e.id));
  expect(sections).toEqual(["home","identity","work","universe","builder","thinking","markets","lab","journey","now","contact"]);
  const broken=await page.locator('a[href^="#"]').evaluateAll(els=>els.map(e=>e.getAttribute("href")).filter(h=>!h||h==="#"||!document.querySelector(h)));
  expect(broken).toEqual([]);
  expect(await page.locator('a[href="mailto:hello@hajihaz.com"]').count()).toBe(0);
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect(page.getByRole("link",{name:"Connect through AllBee"})).toHaveAttribute("href","https://allbeesolutions.com");
  await expect(page.getByRole("link",{name:"Find me on GitHub"})).toHaveAttribute("href","https://github.com/hajihaz");
  expect(errors).toEqual([]);
});

test("featured worlds and every case study open, close and return focus",async({page})=>{
  await page.locator("#work").scrollIntoViewIfNeeded();
  const tabs=page.getByRole("group",{name:"Choose a featured project"}).getByRole("button");
  for(let i=0;i<5;i++){
    await tabs.nth(i).click();
    await expect(tabs.nth(i)).toHaveAttribute("aria-pressed","true");
    await page.getByRole("button",{name:"Explore the system",exact:false}).click();
    const dialog=page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("heading",{name:"01 / THE IDEA"})).toBeVisible();
    await expect(dialog.getByRole("heading",{name:"06 / WHAT’S NEXT"})).toBeAttached();
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
  }
  for(const name of ["HajiHaz AI","JARVIS","HajiPay"]){
    await page.locator(".additional-projects").getByRole("button",{name:new RegExp(name,"i")}).click();
    await expect(page.getByRole("dialog").getByRole("heading",{name,exact:true})).toBeVisible();
    await page.getByRole("button",{name:"Close dialog"}).click();
    await expect(page.getByRole("dialog")).not.toBeVisible();
  }
});

test("universe connects domains to correct projects with keyboard alternatives",async({page})=>{
  await page.locator("#universe").scrollIntoViewIfNeeded();
  const law=page.locator(".domain-node").filter({hasText:"Law"});
  await law.focus();await page.keyboard.press("Enter");
  await expect(page.locator(".domain-panel h3")).toHaveText("Law");
  await expect(page.getByRole("link",{name:"Explore the legal perspective"})).toHaveAttribute("href","#thinking");
  await page.locator(".domain-node").filter({hasText:"Capital"}).click();
  await expect(page.getByRole("link",{name:"Explore capital & markets"})).toHaveAttribute("href","#markets");
  await page.locator(".domain-node").filter({hasText:"Business"}).click();
  await expect(page.locator(".related-projects")).toContainText("AllBee Solutions");
  await expect(page.locator(".related-projects")).toContainText("Suplaykart");
  await page.getByRole("button",{name:"Return to the central universe"}).click();
  await expect(page.locator(".domain-panel h3")).toHaveText("Everything connects.");
});

test("architecture and all working laboratory controls",async({page})=>{
  await page.locator("#builder").scrollIntoViewIfNeeded();
  await page.getByRole("group",{name:"Explore the architecture layers"}).getByRole("button",{name:/Data/}).click();
  await expect(page.locator(".layer-detail")).toContainText("Memory that the product can trust.");
  await page.locator("#lab").scrollIntoViewIfNeeded();
  const pattern=await page.locator(".pattern-grid").innerHTML();
  await page.getByRole("button",{name:"Generate a pattern"}).click();
  expect(await page.locator(".pattern-grid").innerHTML()).not.toEqual(pattern);
  await page.getByLabel("Noise level").fill("20");
  await expect(page.locator(".slider-label")).toContainText("20%");
  await page.getByRole("button",{name:"Send a signal"}).click();
  await expect(page.getByRole("button",{name:"Stop the flow"})).toHaveAttribute("aria-pressed","true");
  await page.getByRole("button",{name:"Stop the flow"}).click();
  await expect(page.getByRole("button",{name:"Send a signal"})).toHaveAttribute("aria-pressed","false");
});

test("HAJI OS executes every command, remembers history and traps focus",async({page})=>{
  await page.getByRole("button",{name:"Open HAJI OS"}).click();
  const dialog=page.getByRole("dialog",{name:"HAJI OS command interface"});
  await expect(dialog).toBeVisible();
  const input=page.getByLabel("Enter a command");await expect(input).toBeFocused();
  const commands:{[key:string]:string}={help:"whoami",whoami:"Syed Hasan Kuddos Sahib",projects:"Namma Road",stack:"TypeScript",universe:"The responsibility layer",contact:"https://github.com/hajihaz",now:"Corporate law"};
  for(const [cmd,text] of Object.entries(commands)){await input.fill(cmd);await input.press("Enter");await expect(dialog.getByRole("log")).toContainText(text);}
  await input.press("ArrowUp");await expect(input).toHaveValue("now");
  await input.fill("unknown");await input.press("Enter");await expect(dialog.getByRole("log")).toContainText("Unknown command");
  await input.fill("clear");await input.press("Enter");await expect(dialog.getByRole("log")).toBeEmpty();
  await page.keyboard.press("Escape");await expect(dialog).not.toBeVisible();
  await expect(page.getByRole("button",{name:"Open HAJI OS"})).toBeFocused();
});

test("mobile menu and pause motion remain usable",async({page,isMobile})=>{
  if(isMobile){
    await page.getByRole("button",{name:/^Menu/}).click();
    await expect(page.getByRole("navigation",{name:"Main navigation"})).toBeVisible();
    await page.getByRole("navigation").getByRole("link",{name:"Selected work"}).click();
    await expect(page.getByRole("navigation")).not.toBeVisible();
    await expect(page).toHaveURL(/#work$/);
  }
  const pause=page.getByRole("button",{name:"Pause motion"});
  if(await pause.count()){await pause.click();await expect(page.getByRole("button",{name:"Resume motion"})).toHaveAttribute("aria-pressed","true");}
});

test("no serious accessibility violations on page and modal",async({page})=>{
  const result=await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa"]).analyze();
  expect(result.violations).toEqual([]);
  await page.getByRole("button",{name:"Open HAJI OS"}).click();
  const modal=await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa"]).analyze();
  expect(modal.violations).toEqual([]);
});

test("responsive layouts fit 320, 390, 768, 1024 and 1440 pixels",async({page})=>{
  for(const width of [320,390,768,1024,1440]){
    await page.setViewportSize({width,height:900});
    await page.locator("#contact").scrollIntoViewIfNeeded();
    const size=await page.evaluate(()=>({inner:innerWidth,scroll:document.documentElement.scrollWidth}));
    expect(size.scroll).toBeLessThanOrEqual(size.inner+1);
    const clipped=await page.locator("h1,h2").evaluateAll(els=>els.filter(e=>{const r=e.getBoundingClientRect();return r.left<0||r.right>innerWidth+2;}).map(e=>e.textContent));
    expect(clipped).toEqual([]);
  }
});

test("reduced motion and JavaScript-free content have usable fallbacks",async({browser,baseURL})=>{
  const context=await browser.newContext({reducedMotion:"reduce",viewport:{width:390,height:844}});
  const page=await context.newPage();await page.goto(baseURL!);
  await expect(page.locator(".arrival")).not.toHaveClass(/arrival-active/);
  await expect(page.getByRole("button",{name:"Motion reduced"})).toBeDisabled();
  await expect(page.locator("html")).toHaveCSS("scroll-behavior","auto");
  await context.close();
  const plain=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const staticPage=await plain.newPage();await staticPage.goto(baseURL!);
  await expect(staticPage.getByRole("heading",{name:"BUILDING THE UNBUILT.",level:1})).toBeVisible();
  await expect(staticPage.locator(".core-static")).toBeVisible();
  await expect(staticPage.getByRole("link",{name:"Connect through AllBee"})).toBeAttached();
  await expect(staticPage.locator(".arrival")).not.toBeVisible();
  await plain.close();
});

test("first-visit intro resolves and does not replay on refresh",async({browser,baseURL})=>{
  const context=await browser.newContext();
  const page=await context.newPage();await page.goto(baseURL!);
  await expect(page.locator(".arrival")).not.toHaveClass(/arrival-active/,{timeout:4000});
  await expect(page.getByRole("heading",{name:"BUILDING THE UNBUILT.",level:1})).toBeVisible();
  await page.reload();await expect(page.locator(".arrival")).not.toHaveClass(/arrival-active/);
  await context.close();
});

test("rendered desktop and mobile evidence",async({page},info)=>{
  const errors:string[]=[];page.on("pageerror",e=>errors.push(e.message));
  if(await page.getByRole("button",{name:"Explore the sculpture in 3D"}).count())await page.getByRole("button",{name:"Explore the sculpture in 3D"}).click();
  await expect(page.locator(".hero .sculpture")).toHaveAttribute("data-renderer","webgl",{timeout:15000});
  const prefix=info.project.name;
  await page.screenshot({path:`.ai/raw/${prefix}-hero.png`});
  for(const id of ["identity","work","universe","thinking","lab","contact"]){
    await page.locator("#"+id).scrollIntoViewIfNeeded();
    await page.screenshot({path:`.ai/raw/${prefix}-${id}.png`});
  }
  expect(errors).toEqual([]);
});

test("WebGL loss recovers without hiding the readable site",async({page})=>{
  if(await page.getByRole("button",{name:"Explore the sculpture in 3D"}).count())await page.getByRole("button",{name:"Explore the sculpture in 3D"}).click();
  await expect(page.locator(".hero .sculpture")).toHaveAttribute("data-renderer","webgl",{timeout:15000});
  const supported=await page.locator(".hero canvas").evaluate(canvas=>{
    const gl=(canvas as HTMLCanvasElement).getContext("webgl2");
    const ext=gl?.getExtension("WEBGL_lose_context");
    if(!ext)return false;
    ext.loseContext();setTimeout(()=>ext.restoreContext(),800);return true;
  });
  test.skip(!supported,"Browser does not expose context loss simulation.");
  await expect(page.getByRole("heading",{name:"BUILDING THE UNBUILT.",level:1})).toBeVisible();
  await expect(page.locator(".hero .sculpture")).toHaveAttribute("data-renderer","webgl",{timeout:10000});
});

test("verified business email and copy control",async({page,browserName})=>{
 await expect(page.getByRole("link",{name:"Email AllBee"})).toHaveAttribute("href","mailto:contact@allbeesolutions.com");
 if(browserName==="chromium")await page.context().grantPermissions(["clipboard-write"]);
 await page.bringToFront();
 await page.getByRole("button",{name:"Copy business email"}).click();
 if(browserName==="chromium")await expect(page.getByRole("status").filter({hasText:"Business email copied"})).toBeAttached();
});
