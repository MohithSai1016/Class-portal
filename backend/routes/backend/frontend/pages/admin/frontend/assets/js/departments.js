const API =
"http://localhost:5000/api/departments";

const token =
localStorage.getItem("token");

async function loadDepartments(){

const response =
await fetch(API,{

headers:{

Authorization:
`Bearer ${token}`

}

});

const data =
await response.json();

const body =
document.getElementById(
"departmentBody"
);

body.innerHTML="";

data.departments.forEach(dep=>{

body.innerHTML += `

<tr>

<td>${dep.id}</td>

<td>${dep.name}</td>

</tr>

`;

});

}

document
.getElementById("departmentForm")
.addEventListener(
"submit",
async e=>{

e.preventDefault();

await fetch(API,{

method:"POST",

headers:{

"Content-Type":
"application/json",

Authorization:
`Bearer ${token}`

},

body:JSON.stringify({

name:

document.getElementById(
"departmentName"
).value

})

});

loadDepartments();

});

loadDepartments();