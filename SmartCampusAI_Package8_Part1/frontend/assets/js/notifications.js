const token=localStorage.getItem("token");
const container=document.getElementById("notifications");
const status=document.getElementById("status");

function esc(v){
 return String(v).replaceAll("&","&amp;").replaceAll("<","&lt;")
 .replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
}

async function loadNotifications(){
 try{
  const r=await fetch("http://localhost:5000/api/notifications",
   {headers:{Authorization:`Bearer ${token}`}});
  const d=await r.json();
  if(!d.success) throw new Error(d.message);
  container.innerHTML=d.notifications.map(n=>`
   <article data-id="${n.id}" style="margin:12px 0;padding:16px;border:1px solid #ddd">
    <h3>${esc(n.title)}</h3>
    <p>${esc(n.message)}</p>
    <small>${esc(n.notification_type)} · ${esc(n.priority)} ·
    ${new Date(n.created_at).toLocaleString()}</small><br>
    <button class="read-button" data-id="${n.id}" ${n.is_read?"disabled":""}>
    ${n.is_read?"Read":"Mark as Read"}</button>
   </article>`).join("") || "<p>No notifications.</p>";
  document.querySelectorAll(".read-button").forEach(b=>
   b.addEventListener("click",()=>markRead(b.dataset.id)));
 }catch(e){status.textContent="Unable to load notifications.";}
}

async function markRead(id){
 await fetch(`http://localhost:5000/api/notifications/${id}/read`,
  {method:"PATCH",headers:{Authorization:`Bearer ${token}`}});
 loadNotifications();
}

document.getElementById("markAllRead").addEventListener("click",async()=>{
 await fetch("http://localhost:5000/api/notifications/read-all",
  {method:"PATCH",headers:{Authorization:`Bearer ${token}`}});
 loadNotifications();
});
loadNotifications();
