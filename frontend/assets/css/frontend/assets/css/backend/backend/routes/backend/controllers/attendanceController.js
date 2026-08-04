const attendanceService =
require("../services/attendanceService");

async function studentAttendance(req,res){

    try{

        const data=
        await attendanceService.getAttendance(
            req.user.id
        );

        res.json({

            success:true,

            attendance:data

        });

    }catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

}

module.exports={

studentAttendance

};