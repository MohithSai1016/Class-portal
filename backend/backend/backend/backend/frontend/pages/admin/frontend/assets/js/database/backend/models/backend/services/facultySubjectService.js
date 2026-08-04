const FacultySubject =
require("../models/FacultySubject");

async function getAssignments(){

return await FacultySubject.findAll();

}

async function createAssignment(data){

return await FacultySubject.create(data);

}

module.exports={

getAssignments,

createAssignment

};