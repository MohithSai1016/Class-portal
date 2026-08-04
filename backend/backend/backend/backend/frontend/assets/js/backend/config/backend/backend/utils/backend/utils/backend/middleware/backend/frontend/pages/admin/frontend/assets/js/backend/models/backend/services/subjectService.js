const Subject =
require("../models/Subject");

async function getSubjects(){

    return await Subject.findAll();

}

async function createSubject(data){

    return await Subject.create(data);

}

module.exports={

    getSubjects,

    createSubject

};