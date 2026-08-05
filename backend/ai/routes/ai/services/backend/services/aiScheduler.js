const {
    isFacultyAvailable,
    isRoomAvailable,
    isSectionAvailable
} = require("./conflictService");

const {
    balance
} = require("./workloadBalancer");

const assignments =
    balance(inputAssignments);

for (const assignment of assignments) {

    for (const slot of slots) {

        const room =
            assignRoom(classrooms, 0);

        const candidate = {

            ...assignment,

            ...slot,

            classroom_id: room.id

        };

        if (
            isFacultyAvailable(schedule, candidate) &&
            isRoomAvailable(schedule, candidate) &&
            isSectionAvailable(schedule, candidate)
        ) {

            schedule.push(candidate);

            break;

        }

    }

}