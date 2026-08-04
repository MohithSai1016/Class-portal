async function loadAttendance(){

const token=
localStorage.getItem("token");

const response=
await fetch(

"http://localhost:5000/api/attendance/student",

{

headers:{

Authorization:
`Bearer ${token}`

}

}

);

const data=
await response.json();

const tbody=
document.querySelector("tbody");

tbody.innerHTML="";

data.attendance.forEach(record=>{

tbody.innerHTML+=`

<tr>

<td>${record.attendance_date}</td>

<td>${record.status}</td>

<td>${record.check_in??"-"}</td>

</tr>

`;

});

}