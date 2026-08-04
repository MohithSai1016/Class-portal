const generator =
require("../services/timetableGenerator");

async function generate(req, res) {

    const result =
        generator.generate(req.body.entries);

    res.json({

        success: true,

        generated: result.length,

        timetable: result

    });

}

module.exports = {

    generate

};