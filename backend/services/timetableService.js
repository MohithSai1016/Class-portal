const Timetable =
require("../models/Timetable");

async function getTimetable(){

    return await Timetable.findAll();

}

module.exports={

    getTimetable

};