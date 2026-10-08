import { ImageResponse } from "next/og";
export const alt="HAJIHAZ — Building the Unbuilt. Technology. Business. Law. Capital.";
export const size={width:1200,height:630};
export const contentType="image/png";
export default function Image() {
  return new ImageResponse(<div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",background:"#090a0c",color:"#f2eee5",padding:"55px 70px",position:"relative"}}>
    <div style={{display:"flex",fontSize:22,fontWeight:700,letterSpacing:2}}>HAJIHAZ<span style={{color:"#ff5948",marginLeft:14}}>·</span></div>
    <div style={{display:"flex",flexDirection:"column",marginTop:65,fontSize:88,fontWeight:700,letterSpacing:-5,lineHeight:1.04}}><span>BUILDING</span><span style={{color:"#c8b28a"}}>THE UNBUILT.</span></div>
    <div style={{display:"flex",fontSize:18,color:"#a3a3a0",marginTop:30}}>Technology. Business. Law. Capital.</div>
    <div style={{position:"absolute",display:"flex",right:88,top:210,fontSize:190,fontWeight:700,color:"#383b3c",transform:"rotate(-12deg)"}}>H</div>
    <div style={{display:"flex",justifyContent:"space-between",borderTop:"1px solid #343630",paddingTop:22,marginTop:"auto",fontSize:13,color:"#a3a3a0"}}><span>SYED HASAN KUDDOS SAHIB</span><span>ONE INTERCONNECTED VISION.</span></div>
  </div>,size);
}
