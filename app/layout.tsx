import type { Metadata } from "next";
import { Manrope, Cormorant_Garamond, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const sans=Manrope({subsets:["latin"],display:"swap",variable:"--font-sans"});
const editorial=Cormorant_Garamond({weight:["500","600"],style:["normal","italic"],subsets:["latin"],display:"swap",variable:"--font-editorial"});
const mono=IBM_Plex_Mono({weight:["400"],subsets:["latin"],display:"swap",variable:"--font-mono"});

export const metadata: Metadata = {
  metadataBase:new URL("https://hajihaz.vercel.app"),
  title:"HAJIHAZ — Building the Unbuilt",
  description:"The personal universe of Syed Hasan Kuddos Sahib. Founder, product builder and law student connecting technology, business, law and capital.",
  alternates:{canonical:"/"},
  openGraph:{type:"website",url:"/",title:"HAJIHAZ — Building the Unbuilt",description:"One person. Multiple worlds. One interconnected vision.",siteName:"HAJIHAZ"},
  twitter:{card:"summary_large_image",title:"HAJIHAZ — Building the Unbuilt",description:"Founder. Product builder. Law student. One interconnected vision."},
  icons:{icon:"/icon.svg"},
};
const person={"@context":"https://schema.org","@type":"Person",name:"Syed Hasan Kuddos Sahib",alternateName:"HAJIHAZ",url:"https://hajihaz.vercel.app",sameAs:["https://github.com/hajihaz"],description:"Founder, product builder and law student from Tamil Nadu, India."};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) {
  return <html lang="en" className={`${sans.variable} ${editorial.variable} ${mono.variable}`}><head><link rel="preload" as="image" href="/core-still.webp"/></head><body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(person).replace(/</g,"\\u003c")}}/>{children}</body></html>;
}
