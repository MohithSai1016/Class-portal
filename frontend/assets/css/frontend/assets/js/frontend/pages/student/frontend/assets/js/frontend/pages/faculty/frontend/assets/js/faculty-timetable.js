const token =
localStorage.getItem("token");

const employeeId =
localStorage.getItem("employeeId");

async function loadFacultySchedule() {

    const response =
        await fetch(

            `http://localhost:5000/api/timetable-portal/faculty/${employeeId}`,

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
            "facultyRows"
        );

    body.innerHTML = "";

    data.timetable.forEach(row => {

        body.innerHTML += `

<tr>

<td>${row.day_of_week}</td>

<td>${row.start_time} - ${row.end_time}</td>

<td>${row.subject_code} - ${row.subject_name}</td>

<td>${row.semester}</td>

<td>${row.section}</td>

<td>${row.room_number}</td>

</tr>

`;

    });

}

loadFacultySchedule();