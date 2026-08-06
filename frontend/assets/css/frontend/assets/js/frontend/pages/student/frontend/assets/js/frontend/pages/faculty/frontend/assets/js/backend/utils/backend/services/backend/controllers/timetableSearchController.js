const Timetable =
require("../models/Timetable");

const {

filterTimetable

}=

require("../services/timetableSearchService");

async function search(req,res){

const rows=

await Timetable.findAll();

const filtered=

filterTimetable(

rows,

req.query

);

res.json({

success:true,

count:filtered.length,

results:filtered

});

}

module.exports={

search

};