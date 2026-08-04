const token =
localStorage.getItem("token");

async function loadSubjects(){

const response =
await fetch(

"http://localhost:5000/api/subjects",

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
"subjectBody"
);

body.innerHTML="";

data.subjects.forEach(subject=>{

body.innerHTML += `

<tr>

<td>${subject.subject_code}</td>

<td>${subject.subject_name}</td>

<td>${subject.credits}</td>

<td>${subject.semester}</td>

<td>${subject.department_name}</td>

</tr>

`;

});

}

loadSubjects();