const subjectService =
require("../services/subjectService");

async function list(req,res){

    const subjects =
        await subjectService.getSubjects();

    res.json({

        success:true,

        subjects

    });

}

async function create(req,res){

    const id =
        await subjectService.createSubject(
            req.body
        );

    res.status(201).json({

        success:true,

        id

    });

}

module.exports={

    list,

    create

};