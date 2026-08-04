const video =
document.getElementById("video");

navigator.mediaDevices
.getUserMedia({

video:true

})
.then(stream=>{

video.srcObject=stream;

});

async function startCapture(){

const studentId=
document.getElementById(
"studentId"
).value;

if(!studentId){

alert("Enter Student ID");

return;

}

const canvas=
document.getElementById("canvas");

const ctx=
canvas.getContext("2d");

let count=0;

const timer=
setInterval(async()=>{

ctx.drawImage(

video,

0,

0,

640,

480

);

canvas.toBlob(async(blob)=>{

const form=
new FormData();

form.append(

"student_id",

studentId

);

form.append(

"files",

blob,

`${count}.jpg`

);

await fetch(

"http://localhost:8000/register/",

{

method:"POST",

body:form

}

);

});

count++;

document.getElementById(
"progress"
).innerHTML=

`Captured ${count}/30`;

if(count>=30){

clearInterval(timer);

document.getElementById(
"progress"
).innerHTML=

"Registration Completed";

}

},500);

}