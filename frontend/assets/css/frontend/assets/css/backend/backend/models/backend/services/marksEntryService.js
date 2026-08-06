const Repository =
require("../models/GradebookRepository");

async function getStudentMarks(
assessmentId
){

    return await Repository.getStudentsForAssessment(
        assessmentId
    );

}

module.exports = {

    getStudentMarks

};