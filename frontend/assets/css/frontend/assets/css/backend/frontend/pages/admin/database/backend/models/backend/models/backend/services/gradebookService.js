const Assessment =
require("../models/Assessment");

const Mark =
require("../models/Mark");

async function getAssessments(){

    return await Assessment.findAll();

}

async function saveMark(data){

    return await Mark.saveMark(data);

}

module.exports={

    getAssessments,

    saveMark

};