console.log("Smart Campus AI Initialized");

document.addEventListener("DOMContentLoaded",()=>{

document.querySelectorAll("form").forEach(form=>{

form.addEventListener("submit",e=>{

e.preventDefault();

alert("Authentication API will be connected in Package 2.");

});

});

});
app.use(
"/api/timetable",
require("./routes/timetableRoutes")
);
app.use(
"/api/timetable-generator",
require("./routes/timetableGeneratorRoutes")
);