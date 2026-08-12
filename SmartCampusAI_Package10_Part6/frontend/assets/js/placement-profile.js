const token=
    localStorage.getItem("token");

const headers={
    Authorization:`Bearer ${token}`,
    "Content-Type":"application/json"
};

function id(name){
    return document.getElementById(name);
}

function esc(value){
    return String(value)
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;")
        .replaceAll("'","&#039;");
}

async function loadProfile(){
    const response=
        await fetch(
            "http://localhost:5000/api/student-placement-profile/mine",
            {headers}
        );

    const data=
        await response.json();

    if(!data.success){
        throw new Error(
            data.message
        );
    }

    const p=data.profile;

    if(!p) return;

    id("resumeFileName").value=
        p.resume_file_name || "";

    id("resumeFilePath").value=
        p.resume_file_path || "";

    id("linkedinUrl").value=
        p.linkedin_url || "";

    id("githubUrl").value=
        p.github_url || "";

    id("portfolioUrl").value=
        p.portfolio_url || "";

    id("skills").value=
        p.skills || "";

    id("certifications").value=
        p.certifications || "";

    id("projectsCount").value=
        p.projects_count || 0;

    id("internshipsCount").value=
        p.internships_count || 0;
}

id("profileForm").onsubmit=
    async event=>{
        event.preventDefault();

        try{
            const body={
                resumeFileName:
                    id("resumeFileName").value,
                resumeFilePath:
                    id("resumeFilePath").value,
                linkedinUrl:
                    id("linkedinUrl").value,
                githubUrl:
                    id("githubUrl").value,
                portfolioUrl:
                    id("portfolioUrl").value,
                skills:
                    id("skills").value,
                certifications:
                    id("certifications").value,
                projectsCount:
                    Number(
                        id("projectsCount").value
                    ),
                internshipsCount:
                    Number(
                        id("internshipsCount").value
                    )
            };

            const response=
                await fetch(
                    "http://localhost:5000/api/student-placement-profile/mine",
                    {
                        method:"PUT",
                        headers,
                        body:JSON.stringify(body)
                    }
                );

            const data=
                await response.json();

            if(!data.success){
                throw new Error(
                    data.message
                );
            }

            id("message").textContent=
                "Placement profile saved.";
        }catch(error){
            id("message").textContent=
                error.message;
        }
    };

id("calculate").onclick=
    async()=>{
        try{
            const response=
                await fetch(
                    "http://localhost:5000/api/student-placement-profile/mine/readiness",
                    {headers}
                );

            const data=
                await response.json();

            if(!data.success){
                throw new Error(
                    data.message
                );
            }

            const r=data.readiness;

            id("readiness").innerHTML=`
                <p class="score">
                    ${esc(r.score)}/100
                </p>

                <p>
                    Status:
                    <strong>
                        ${
                            r.placementReady
                                ? "Placement Ready"
                                : "Needs Improvement"
                        }
                    </strong>
                </p>

                <ul>
                    <li>
                        Academic:
                        ${esc(r.breakdown.academic)}
                    </li>
                    <li>
                        Skills:
                        ${esc(r.breakdown.skills)}
                    </li>
                    <li>
                        Projects:
                        ${esc(r.breakdown.projects)}
                    </li>
                    <li>
                        Internships:
                        ${esc(r.breakdown.internships)}
                    </li>
                    <li>
                        Certifications:
                        ${esc(r.breakdown.certifications)}
                    </li>
                    <li>
                        Professional Profiles:
                        ${esc(
                            r.breakdown.professionalProfiles
                        )}
                    </li>
                </ul>
            `;
        }catch(error){
            id("message").textContent=
                error.message;
        }
    };

loadProfile().catch(error=>{
    id("message").textContent=
        error.message;
});
