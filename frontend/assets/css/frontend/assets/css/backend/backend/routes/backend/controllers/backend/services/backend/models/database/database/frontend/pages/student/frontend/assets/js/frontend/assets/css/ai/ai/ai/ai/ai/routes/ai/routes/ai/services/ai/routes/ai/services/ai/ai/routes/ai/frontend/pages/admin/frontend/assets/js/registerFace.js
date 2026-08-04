const form =
document.getElementById("faceForm");

form.addEventListener("submit", async e => {

e.preventDefault();

const data = new FormData();

data.append(

"student_id",

document.getElementById(
"studentId"
).value

);

const files =
document.getElementById("images").files;

for(const file of files){

data.append("files",file);

}

const response = await fetch(

"http://localhost:8000/register/",

{

method:"POST",

body:data

}

);

const result =
await response.json();

document.getElementById(
"result"
).innerText =

`${result.images_saved} images uploaded successfully.`;

});