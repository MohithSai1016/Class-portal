const Fee =
require("../models/StudentFee");

async function studentFee(studentId){

    return await Fee.getStudentFee(studentId);

}

module.exports = {

    studentFee

};