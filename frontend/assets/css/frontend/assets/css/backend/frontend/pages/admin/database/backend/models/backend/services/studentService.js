const Student =
require("../models/Student");

async function getStudents(){

    return await Student.findAll();

}

module.exports={

getStudents

};