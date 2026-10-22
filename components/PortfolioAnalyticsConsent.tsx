'use client';
import {useEffect,useState} from 'react';
import {Analytics} from '@vercel/analytics/next';
import {analyticsPrivacySignal,safePortfolioAnalyticsUrl} from '../lib/portfolio-analytics-policy';

const KEY='hajihaz-portfolio-analytics-consent-v1';
type Choice='yes'|'no'|'blocked'|null|undefined;
/** Consent is never inferred from site use or a separate product's cookie. */
export default function PortfolioAnalyticsConsent(){
 const [choice,setChoice]=useState<Choice>(undefined);
 const [show,setShow]=useState(false);
 useEffect(()=>{
  const gp=(navigator as Navigator & {globalPrivacyControl?:boolean}).globalPrivacyControl;
  if(analyticsPrivacySignal(navigator.doNotTrack,gp)){setChoice('blocked');return;}
  try{
   const saved=localStorage.getItem(KEY);
   setChoice(saved==='yes'||saved==='no'?saved:null);
   setShow(saved!=='yes'&&saved!=='no');
  }catch{setChoice('no');}
 },[]);
 function update(next:'yes'|'no'){
  try{localStorage.setItem(KEY,next);}catch{setChoice('no');setShow(false);return;}
  const wasActive=choice==='yes';setChoice(next);setShow(false);
  if(next==='no'&&wasActive)window.location.reload(); // Remove any previously initialized SDK listeners.
 }
 if(choice===undefined||choice==='blocked')return null;
 return <>
   {choice==='yes'&&<Analytics beforeSend={event=>{
    const url=safePortfolioAnalyticsUrl(event.url,window.location.origin);
    return url?{...event,url}:null;
   }}/>}
   <aside className="portfolio-analytics-control" aria-label="Optional portfolio analytics">
    {show?<div role="group" aria-label="Portfolio visitor analytics permission">
      <strong>Optional site analytics</strong>
      <p>Allow anonymous page-visit counts for this portfolio through Vercel Analytics? No forms, messages, personal profiles or private project activity are collected. You can withdraw anytime.</p>
      <div className="portfolio-analytics-actions">
       <button type="button" onClick={()=>update('yes')}>Allow analytics</button>
       <button type="button" onClick={()=>update('no')}>No thanks</button>
      </div>
    </div>:<button type="button" className="portfolio-analytics-manage" onClick={()=>setShow(true)} aria-label="Change optional analytics consent">Privacy settings</button>}
   </aside>
 </>;
}
