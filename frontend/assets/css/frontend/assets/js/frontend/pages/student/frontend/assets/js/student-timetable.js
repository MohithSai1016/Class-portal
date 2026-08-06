const token =
localStorage.getItem("token");

const rollNumber =
localStorage.getItem("rollNumber");

async function loadTimetable() {

    const response =
        await fetch(

            `http://localhost:5000/api/timetable-portal/student/${rollNumber}`,

            {

                headers: {

                    Authorization:
                    `Bearer ${token}`

                }

            }

        );

    const data =
        await response.json();

    const body =
        document.getElementById(
            "studentRows"
        );

    body.innerHTML = "";

    data.timetable.forEach(row => {

        body.innerHTML += `

<tr>

<td>${row.day_of_week}</td>

<td>${row.start_time} - ${row.end_time}</td>

<td>${row.subject_code} - ${row.subject_name}</td>

<td>${row.faculty_name}</td>

<td>${row.room_number}</td>

</tr>

`;

    });

}

loadTimetable();