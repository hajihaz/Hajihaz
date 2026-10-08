import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir:"./tests", timeout:45000, expect:{timeout:10000}, fullyParallel:false, workers:1,
  reporter:[["list"],["json",{outputFile:".ai/raw/playwright-results.json"}]],
  use:{baseURL:process.env.PORTFOLIO_URL||"http://127.0.0.1:3013",trace:"retain-on-failure",screenshot:"only-on-failure"},
  projects:[{name:"chromium-android",use:{...devices["Pixel 7"],browserName:"chromium"}},{name:"chromium-desktop",use:{...devices["Desktop Chrome"],viewport:{width:1440,height:1000}}},{name:"webkit-iphone",use:{...devices["iPhone 13"],browserName:"webkit"}}],
});
