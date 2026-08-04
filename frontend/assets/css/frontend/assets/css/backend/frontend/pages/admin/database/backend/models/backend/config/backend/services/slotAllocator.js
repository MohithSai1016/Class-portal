const {

DAYS,

TIME_SLOTS

} = require("../config/timetableConfig");

function generateSlots() {

    const slots = [];

    DAYS.forEach(day => {

        TIME_SLOTS.forEach(slot => {

            slots.push({

                day_of_week: day,

                start_time: slot.start,

                end_time: slot.end

            });

        });

    });

    return slots;

}

module.exports = {

    generateSlots

};