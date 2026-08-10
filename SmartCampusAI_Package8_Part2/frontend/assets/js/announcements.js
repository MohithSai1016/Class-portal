const token=localStorage.getItem("token");
const container=document.getElementById("announcements");

function esc(v){
 return String(v).replaceAll("&","&amp;").replaceAll("<","&lt;")
 .replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
}

async function loadAnnouncements(){
 try{
  const r=await fetch("http://localhost:5000/api/announcements",{
   headers:{Authorization:`Bearer ${token}`}
  });
  const d=await r.json();
  if(!d.success) throw new Error(d.message);

  container.innerHTML=d.announcements.map(a=>`
   <article style="margin:16px 0;padding:18px;border:1px solid #ddd">
    <h2>${esc(a.title)}</h2>
    <p>${esc(a.message)}</p>
    <small>
      Audience: ${esc(a.audience)}
      · Priority: ${esc(a.priority)}
      · Published: ${new Date(a.published_at).toLocaleString()}
    </small>
   </article>
  `).join("") || "<p>No active announcements.</p>";
 }catch(e){
  container.textContent="Unable to load announcements.";
 }
}

loadAnnouncements();
