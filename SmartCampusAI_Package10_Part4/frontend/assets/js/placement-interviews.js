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

function interviewCard(item){
    return `
    <article class="card">
        <h3>
            ${esc(item.company_name)}
            -
            ${esc(item.role_title)}
        </h3>

        <p>
            <strong>Round:</strong>
            ${esc(item.interview_round)}
        </p>

        <p>
            <strong>Type:</strong>
            ${esc(item.interview_type)}
        </p>

        <p>
            <strong>Date & Time:</strong>
            ${esc(item.scheduled_at)}
        </p>

        <p>
            <strong>Status:</strong>
            ${esc(item.interview_status)}
        </p>

        ${
            item.venue
                ? `<p><strong>Venue:</strong> ${esc(item.venue)}</p>`
                : ""
        }

        ${
            item.interviewer_name
                ? `<p><strong>Interviewer:</strong> ${esc(item.interviewer_name)}</p>`
                : ""
        }

        ${
            item.meeting_url
                ? `
                <p>
                    <a
                        href="${esc(item.meeting_url)}"
                        target="_blank"
                        rel="noopener">
                        Open Meeting
                    </a>
                </p>
                `
                : ""
        }

        ${
            item.notes
                ? `<p>${esc(item.notes)}</p>`
                : ""
        }
    </article>
    `;
}

async function load(){
    try{
        const [upcomingResponse,
               historyResponse]=
            await Promise.all([
                fetch(
                    "http://localhost:5000/api/placement-interviews/mine/upcoming",
                    {headers}
                ),
                fetch(
                    "http://localhost:5000/api/placement-interviews/mine",
                    {headers}
                )
            ]);

        const upcomingData=
            await upcomingResponse.json();

        const historyData=
            await historyResponse.json();

        if(
            !upcomingData.success ||
            !historyData.success
        ){
            throw new Error(
                "Unable to load interview data."
            );
        }

        document.getElementById(
            "upcoming"
        ).innerHTML=
            upcomingData.interviews.length
                ? upcomingData.interviews
                    .map(interviewCard)
                    .join("")
                : "<p>No upcoming interviews.</p>";

        document.getElementById(
            "history"
        ).innerHTML=
            historyData.interviews.length
                ? historyData.interviews
                    .map(interviewCard)
                    .join("")
                : "<p>No interview records.</p>";
    }catch(error){
        document.getElementById(
            "message"
        ).textContent=
            error.message;
    }
}

load();
