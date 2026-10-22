import test from 'node:test';import assert from 'node:assert/strict';
import {safePortfolioAnalyticsUrl,analyticsPrivacySignal} from '../lib/portfolio-analytics-policy.ts';
test('only exact public home path can be tracked without query or fragment',()=>{
 const origin='https://hajihaz.vercel.app';
 assert.equal(safePortfolioAnalyticsUrl(origin+'/?token=private#section',origin),origin+'/');
 assert.equal(safePortfolioAnalyticsUrl(origin+'/',origin),origin+'/');
 for(const u of [origin+'/admin',origin+'/private/id',origin+'/contact?email=x','http://hajihaz.vercel.app/',
 'https://other.example/','https://hajihaz.vercel.app.attacker.test/','not-a-url'])
  assert.equal(safePortfolioAnalyticsUrl(u,origin),null,u);
 assert.equal(safePortfolioAnalyticsUrl('http://localhost:3013/?x=1','http://localhost:3013'),'http://localhost:3013/');
});
test('DNT and global privacy control override any voluntary analytics choice',()=>{
 assert.equal(analyticsPrivacySignal('1',false),true);
 assert.equal(analyticsPrivacySignal('0',true),true);
 assert.equal(analyticsPrivacySignal(null,undefined),false);
});

test('portfolio collector is default-off until owner enables the provider and spend controls',async()=>{
 const {readFileSync}=await import('node:fs');
 const source=readFileSync(new URL('../components/PortfolioAnalyticsConsent.tsx',import.meta.url),'utf8');
 assert.match(source,/NEXT_PUBLIC_HAJIHAZ_ANALYTICS_ENABLED==='enabled'/);
 assert.match(source,/if\(!ENABLED\|\|choice===undefined\|\|choice==='blocked'\)return null;/);
});
