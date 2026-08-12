const token=localStorage.getItem("token");
const headers={Authorization:`Bearer ${token}`};
const statusEl=document.getElementById("status");

function esc(v){return String(v).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");}

async function loadProfile(){
    const r=await fetch("http://localhost:5000/api/placement-profile/mine",{headers});
    const d=await r.json();
    if(!d.success) throw new Error(d.message);
    const p=d.profile||{};
    careerGoal.value=p.career_goal||"";
    preferredRole.value=p.preferred_role||"";
    preferredLocation.value=p.preferred_location||"";
    linkedinUrl.value=p.linkedin_url||"";
    githubUrl.value=p.github_url||"";
    portfolioUrl.value=p.portfolio_url||"";
    if(p.placement_status) placementStatus.value=p.placement_status;
}

async function loadSkills(){
    const r=await fetch("http://localhost:5000/api/placement-skills/mine",{headers});
    const d=await r.json();
    if(!d.success) throw new Error(d.message);
    skills.innerHTML=d.skills.map(s=>`
        <article style="background:#fff;padding:12px;margin:8px 0">
        <strong>${esc(s.skill_name)}</strong> - ${esc(s.proficiency)}
        ${s.verified?" ✓ Verified":""}
        <button type="button" data-skill="${esc(s.skill_name)}" class="removeSkill">Remove</button>
        </article>`).join("")||"<p>No skills added.</p>";
    document.querySelectorAll(".removeSkill").forEach(b=>b.onclick=()=>removeSkill(b.dataset.skill));
}

profileForm.onsubmit=async e=>{
    e.preventDefault();
    try{
        const r=await fetch("http://localhost:5000/api/placement-profile/mine",{
            method:"PUT",headers:{...headers,"Content-Type":"application/json"},
            body:JSON.stringify({
                careerGoal:careerGoal.value.trim(),
                preferredRole:preferredRole.value.trim(),
                preferredLocation:preferredLocation.value.trim(),
                linkedinUrl:linkedinUrl.value.trim(),
                githubUrl:githubUrl.value.trim(),
                portfolioUrl:portfolioUrl.value.trim(),
                placementStatus:placementStatus.value
            })
        });
        const d=await r.json();
        statusEl.textContent=d.success?"Placement profile saved.":d.message;
    }catch(e){statusEl.textContent="Unable to save placement profile.";}
};

skillForm.onsubmit=async e=>{
    e.preventDefault();
    try{
        const r=await fetch("http://localhost:5000/api/placement-skills/mine",{
            method:"POST",headers:{...headers,"Content-Type":"application/json"},
            body:JSON.stringify({skillName:skillName.value.trim(),proficiency:proficiency.value})
        });
        const d=await r.json();
        if(!d.success) throw new Error(d.message);
        skillName.value="";
        await loadSkills();
    }catch(e){statusEl.textContent=e.message;}
};

async function removeSkill(name){
    const r=await fetch(`http://localhost:5000/api/placement-skills/mine/${encodeURIComponent(name)}`,{
        method:"DELETE",headers
    });
    const d=await r.json();
    if(!d.success) statusEl.textContent=d.message;
    await loadSkills();
}

Promise.all([loadProfile(),loadSkills()]).catch(()=>{
    statusEl.textContent="Unable to load placement profile.";
});
