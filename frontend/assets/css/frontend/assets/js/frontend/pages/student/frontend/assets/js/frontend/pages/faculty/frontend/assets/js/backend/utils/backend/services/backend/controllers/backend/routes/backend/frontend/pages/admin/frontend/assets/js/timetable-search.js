const token=

localStorage.getItem("token");

document

.getElementById("search")

.onclick=

async()=>{

const day=

document.getElementById(

"day"

).value;

const response=

await fetch(

`http://localhost:5000/api/timetable-search?day=${day}`,

{

headers:{

Authorization:

`Bearer ${token}`

}

}

);

const data=

await response.json();

const body=

document.getElementById(

"rows"

);

body.innerHTML="";

data.results.forEach(r=>{

body.innerHTML+=`

<tr>

<td>${r.day_of_week}</td>

<td>${r.start_time} - ${r.end_time}</td>

<td>${r.subject_name}</td>

<td>${r.faculty_name}</td>

</tr>

`;

});

};