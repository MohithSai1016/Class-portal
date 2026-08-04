function showWelcome(name){

const hour=new Date().getHours();

let greeting="Welcome";

if(hour<12) greeting="Good Morning";

else if(hour<17) greeting="Good Afternoon";

else greeting="Good Evening";

console.log(`${greeting}, ${name}`);

}
function showWelcome(name){

const hour=new Date().getHours();

let greeting="Welcome";

if(hour<12){

greeting="Good Morning";

}else if(hour<17){

greeting="Good Afternoon";

}else{

greeting="Good Evening";

}

document.querySelector("h1").innerHTML=
`${greeting}, ${name}`;

}

window.onload=()=>{

if(document.title.includes("Student")){

showWelcome("Student");

}

if(document.title.includes("Admin")){

showWelcome("Administrator");

}

};