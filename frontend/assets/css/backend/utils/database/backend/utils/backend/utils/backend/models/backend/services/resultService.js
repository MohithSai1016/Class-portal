const {
calculateGPA
}=require("../utils/gpaCalculator");

const {
calculateCGPA
}=require("../utils/cgpaCalculator");

const Repository=
require("../models/ResultRepository");

async function generate(data){

    const gpa=
        calculateGPA(data.subjects);

    const cgpa=
        calculateCGPA(data.previousResults);

    await Repository.saveSemesterResult({

        ...data,

        gpa,

        cgpa

    });

    return{

        gpa,

        cgpa

    };

}

module.exports={

generate

};