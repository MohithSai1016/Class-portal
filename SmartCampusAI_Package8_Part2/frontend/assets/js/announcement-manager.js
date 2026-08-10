const token=localStorage.getItem("token");

document.getElementById("publish").addEventListener("click",async()=>{
 const status=document.getElementById("status");

 const title=document.getElementById("title").value.trim();
 const message=document.getElementById("message").value.trim();
 const audience=document.getElementById("audience").value;
 const priority=document.getElementById("priority").value;
 const expiresAt=document.getElementById("expiresAt").value;

 if(!title || !message){
  status.textContent="Title and message are required.";
  return;
 }

 try{
  const r=await fetch("http://localhost:5000/api/announcements",{
   method:"POST",
   headers:{
    "Content-Type":"application/json",
    Authorization:`Bearer ${token}`
   },
   body:JSON.stringify({
    title,message,audience,priority,
    expiresAt:expiresAt || null
   })
  });

  const d=await r.json();

  if(!d.success){
   status.textContent=d.message;
   return;
  }

  status.textContent=`Announcement published: ${d.announcementId}`;

  document.getElementById("title").value="";
  document.getElementById("message").value="";
  document.getElementById("expiresAt").value="";
 }catch(e){
  status.textContent="Unable to publish announcement.";
 }
});
