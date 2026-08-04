const { hasConflict } =
require("./timetableValidator");

function generate(entries) {

    const schedule = [];

    for (const entry of entries) {

        if (!hasConflict(schedule, entry)) {
            schedule.push(entry);
        }

    }

    return schedule;
}

module.exports = {
    generate
};