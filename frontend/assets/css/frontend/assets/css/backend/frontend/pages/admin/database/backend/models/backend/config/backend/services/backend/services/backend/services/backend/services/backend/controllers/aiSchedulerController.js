const scheduler =
require("../services/aiScheduler");

async function generate(req, res) {

    const {

        assignments,

        classrooms

    } = req.body;

    const timetable =

        scheduler.schedule(

            assignments,

            classrooms

        );

    res.json({

        success: true,

        generated: timetable.length,

        timetable

    });

}

module.exports = {

    generate

};