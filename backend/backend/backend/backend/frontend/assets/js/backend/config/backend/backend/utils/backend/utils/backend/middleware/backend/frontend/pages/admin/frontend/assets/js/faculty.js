const token =
localStorage.getItem("token");

async function loadFaculty(){

const response =
await fetch(

"http://localhost:5000/api/faculty",

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
"facultyBody"
);

body.innerHTML="";

data.faculty.forEach(item=>{

body.innerHTML += `

<tr>

<td>${item.employee_id}</td>

<td>${item.first_name} ${item.last_name}</td>

<td>${item.department_name ?? ""}</td>

<td>${item.designation}</td>

</tr>

`;

});

}

loadFaculty();