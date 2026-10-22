import {test,expect} from '@playwright/test';

test('portfolio records no optional script before consent and remembers withdrawal',async({page})=>{
 await page.goto('/');
 await expect(page.getByRole('group',{name:'Portfolio visitor analytics permission'})).toBeVisible();
 await expect(page.locator('script[src*="_vercel/insights"]')).toHaveCount(0);
 await page.getByRole('button',{name:'Allow analytics'}).click();
 await expect(page.getByRole('button',{name:'Change optional analytics consent'})).toBeVisible();
 expect(await page.evaluate(()=>localStorage.getItem('hajihaz-portfolio-analytics-consent-v1'))).toBe('yes');
 await page.getByRole('button',{name:'Change optional analytics consent'}).click();
 await page.getByRole('button',{name:'No thanks'}).click();
 await page.waitForLoadState('domcontentloaded');
 expect(await page.evaluate(()=>localStorage.getItem('hajihaz-portfolio-analytics-consent-v1'))).toBe('no');
 await expect(page.locator('script[src*="_vercel/insights"]')).toHaveCount(0);
 await expect(page.getByRole('heading',{name:'BUILDING THE UNBUILT.',level:1,exact:true})).toBeVisible();
});

test('Do Not Track defeats previously saved consent',async({page})=>{
 await page.addInitScript(()=>{
  localStorage.setItem('hajihaz-portfolio-analytics-consent-v1','yes');
  Object.defineProperty(navigator,'doNotTrack',{get:()=> '1'});
 });
 await page.goto('/');
 await expect(page.getByRole('button',{name:'Change optional analytics consent'})).toHaveCount(0);
 await expect(page.getByRole('button',{name:'Allow analytics'})).toHaveCount(0);
 await expect(page.locator('script[src*="_vercel/insights"]')).toHaveCount(0);
});

test('decline persists and privacy control can reopen consent',async({page})=>{
 await page.goto('/');
 await page.getByRole('button',{name:'No thanks'}).click();
 await page.reload();
 await expect(page.getByRole('button',{name:'Change optional analytics consent'})).toBeVisible();
 await expect(page.getByRole('button',{name:'Allow analytics'})).toHaveCount(0);
 await expect(page.locator('script[src*="_vercel/insights"]')).toHaveCount(0);
 await page.getByRole('button',{name:'Change optional analytics consent'}).click();
 await expect(page.getByRole('button',{name:'Allow analytics'})).toBeVisible();
});
