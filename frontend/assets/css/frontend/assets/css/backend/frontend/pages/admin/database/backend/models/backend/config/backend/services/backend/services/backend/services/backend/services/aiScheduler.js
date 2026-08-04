const {

generateSlots

} = require("./slotAllocator");

const {

assignRoom

} = require("./classroomAllocator");

function schedule(

assignments,

classrooms

) {

    const slots = generateSlots();

    const timetable = [];

    let current = 0;

    assignments.forEach(item => {

        if (current >= slots.length) {

            return;

        }

        timetable.push({

            ...item,

            ...slots[current],

            classroom_id:
                assignRoom(
                    classrooms,
                    current
                ).id

        });

        current++;

    });

    return timetable;

}

module.exports = {

    schedule

};