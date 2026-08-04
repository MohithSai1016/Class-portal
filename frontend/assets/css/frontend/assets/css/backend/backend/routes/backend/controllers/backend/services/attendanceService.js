const Attendance =
require("../models/Attendance");

async function getAttendance(studentId){

    return await Attendance.findByStudent(studentId);

}

module.exports={

getAttendance

};