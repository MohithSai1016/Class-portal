const token =
localStorage.getItem("token");

async function loadTimetable(){

const response =
await fetch(

"http://localhost:5000/api/timetable",

{

headers:{

Authorization:
`Bearer ${token}`

}

}

);

const data =
await response.json();

const body =
document.getElementById(
"tableBody"
);

body.innerHTML="";

data.timetable.forEach(item=>{

body.innerHTML += `

<tr>

<td>${item.day_of_week}</td>

<td>${item.start_time} - ${item.end_time}</td>

<td>${item.subject_code} - ${item.subject_name}</td>

<td>${item.faculty_name}</td>

<td>${item.room_number}</td>

<td>${item.department}</td>

</tr>

`;

});

}

loadTimetable();