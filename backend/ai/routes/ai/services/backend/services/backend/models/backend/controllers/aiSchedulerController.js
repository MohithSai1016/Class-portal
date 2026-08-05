const repository =
require("../models/TimetableRepository");

...

const timetable =
scheduler.schedule(
assignments,
classrooms
);

await repository.save(
timetable
);

res.json({

success:true,

saved:timetable.length,

timetable

});