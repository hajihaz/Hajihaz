/** The portfolio has one public page. Never send URL queries or unapproved paths. */
export function safePortfolioAnalyticsUrl(raw:string,expectedOrigin:string):string|null {
 try {
  const url=new URL(raw), origin=new URL(expectedOrigin);
  if(url.origin!==origin.origin||url.pathname!=='/')return null;
  if(url.protocol!=='https:' && !(url.protocol==='http:' && ['localhost','127.0.0.1'].includes(url.hostname)))return null;
  return url.origin+'/';
 }catch{return null}
}
export function analyticsPrivacySignal(dnt:string|null|undefined,gpc:boolean|undefined):boolean {
 return dnt==='1'||gpc===true;
}
