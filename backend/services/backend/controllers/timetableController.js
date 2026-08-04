const timetableService =
require("../services/timetableService");

async function list(req,res){

    const timetable =
        await timetableService.getTimetable();

    res.json({

        success:true,

        timetable

    });

}

module.exports={

    list

};