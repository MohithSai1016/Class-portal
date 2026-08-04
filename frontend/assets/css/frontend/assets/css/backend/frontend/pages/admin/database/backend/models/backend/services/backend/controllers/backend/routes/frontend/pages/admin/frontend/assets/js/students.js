async function loadStudents(){

const token=
localStorage.getItem("token");

const response=
await fetch(

"http://localhost:5000/api/student/list",

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

data.students.forEach(student=>{

tbody.innerHTML+=`

<tr>

<td>${student.roll_number}</td>

<td>${student.first_name} ${student.last_name ?? ""}</td>

<td>${student.semester}</td>

<td>${student.section}</td>

</tr>

`;

});

}

loadStudents();