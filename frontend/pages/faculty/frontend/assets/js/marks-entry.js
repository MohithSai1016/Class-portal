const token =
localStorage.getItem("token");

const API =
"http://localhost:5000/api";

async function loadStudents(assessmentId){

const response=
await fetch(

`${API}/marks-entry/${assessmentId}`,

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
"marksBody"
);

body.innerHTML="";

data.students.forEach(student=>{

body.innerHTML+=`

<tr>

<td>${student.roll_number}</td>

<td>${student.student_name}</td>

<td>

<input
type="number"
value="${student.marks_obtained ?? ''}"
class="marks">

</td>

<td>

<input
value="${student.remarks}">

</td>

</tr>

`;

});

}