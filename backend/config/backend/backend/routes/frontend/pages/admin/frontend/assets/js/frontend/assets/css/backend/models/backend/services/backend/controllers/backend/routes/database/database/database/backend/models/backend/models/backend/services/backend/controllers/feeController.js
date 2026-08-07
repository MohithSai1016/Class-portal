const service =
require("../services/feeService");

async function student(req,res){

    const fee =

    await service.studentFee(

        req.params.studentId

    );

    res.json({

        success:true,

        fee

    });

}

module.exports = {

    student

};