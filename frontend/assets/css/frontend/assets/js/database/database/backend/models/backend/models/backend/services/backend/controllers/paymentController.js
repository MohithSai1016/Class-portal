const paymentService =
require("../services/paymentService");

async function summary(req,res){

    const fee=req.body;

    res.json({

        outstanding:

        paymentService.calculateOutstanding(

            fee

        )

    });

}

module.exports={

    summary

};