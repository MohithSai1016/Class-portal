const service=
require("../services/resultService");

async function generate(req,res){

const result=

await service.generate(

req.body

);

res.json({

success:true,

result

});

}

module.exports={

generate

};