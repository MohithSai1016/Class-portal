const service=
require("../services/facultySubjectService");

async function list(req,res){

const rows=
await service.getAssignments();

res.json({

success:true,

assignments:rows

});

}

async function create(req,res){

const id=

await service.createAssignment(

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