const service =
require("../services/gradebookService");

async function assessments(req,res){

    const rows =
        await service.getAssessments();

    res.json({

        success:true,

        assessments:rows

    });

}

async function save(req,res){

    await service.saveMark(req.body);

    res.json({

        success:true

    });

}

module.exports = {

    assessments,

    save

};