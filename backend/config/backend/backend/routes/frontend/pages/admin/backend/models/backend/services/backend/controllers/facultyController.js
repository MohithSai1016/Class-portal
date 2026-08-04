const facultyService =
require("../services/facultyService");

async function list(req,res){

    const faculty =
        await facultyService.getFaculty();

    res.json({

        success:true,

        faculty

    });

}

async function create(req,res){

    const id =
        await facultyService.createFaculty(
            req.body
        );

    res.status(201).json({

        success:true,

        id

    });

}

module.exports = {

    list,

    create

};