const token=
    localStorage.getItem("token");

const headers={
    Authorization:`Bearer ${token}`
};

function esc(value){
    return String(value)
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;")
        .replaceAll("'","&#039;");
}

async function load(){
    const response=await fetch(
        "http://localhost:5000/api/notification-templates",
        {headers}
    );

    const data=await response.json();

    if(!data.success){
        throw new Error(data.message);
    }

    document.getElementById("templates").innerHTML=
        data.templates.map(t=>`
            <article style="padding:12px;margin:10px 0;border:1px solid #ddd">
                <strong>${esc(t.template_key)}</strong>
                <p>${esc(t.title_template)}</p>
                <p>${esc(t.message_template)}</p>
                <small>
                    ${esc(t.notification_type)}
                    · ${esc(t.priority)}
                </small>
            </article>
        `).join("") || "<p>No templates.</p>";
}

document
.getElementById("templateForm")
.addEventListener("submit",async event=>{
    event.preventDefault();

    const status=document.getElementById("status");

    try{
        const response=await fetch(
            "http://localhost:5000/api/notification-templates",
            {
                method:"POST",
                headers:{
                    ...headers,
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    templateKey:
                        document.getElementById("templateKey").value.trim(),
                    titleTemplate:
                        document.getElementById("titleTemplate").value.trim(),
                    messageTemplate:
                        document.getElementById("messageTemplate").value.trim(),
                    notificationType:
                        document.getElementById("type").value,
                    priority:
                        document.getElementById("priority").value
                })
            }
        );

        const data=await response.json();

        status.textContent=data.success
            ? "Template created successfully."
            : data.message;

        if(data.success) load();
    }catch(error){
        status.textContent="Unable to create template.";
    }
});

load().catch(()=>{
    document.getElementById("status").textContent=
        "Unable to load templates.";
});
