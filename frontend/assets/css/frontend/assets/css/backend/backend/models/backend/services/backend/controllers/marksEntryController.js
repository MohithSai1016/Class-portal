const service =
require("../services/marksEntryService");

async function students(req,res){

    const rows =

    await service.getStudentMarks(

        req.params.assessmentId

    );

    res.json({

        success:true,

        students:rows

    });

}

module.exports = {

    students

};