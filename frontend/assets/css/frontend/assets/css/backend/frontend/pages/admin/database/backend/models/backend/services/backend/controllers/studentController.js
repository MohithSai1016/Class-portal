const studentService =
require("../services/studentService");

async function dashboard(req,res){

    res.json({

        success:true,

        message:"Student Dashboard"

    });

}

async function listStudents(req,res){

    const students=
    await studentService.getStudents();

    res.json({

        success:true,

        students

    });

}

module.exports={

dashboard,

listStudents

};