function isFacultyAvailable(schedule, candidate) {

    return !schedule.some(item =>

        item.faculty_id === candidate.faculty_id &&
        item.day_of_week === candidate.day_of_week &&
        item.start_time === candidate.start_time
    );
}

function isRoomAvailable(schedule, candidate) {

    return !schedule.some(item =>

        item.classroom_id === candidate.classroom_id &&
        item.day_of_week === candidate.day_of_week &&
        item.start_time === candidate.start_time
    );
}

function isSectionAvailable(schedule, candidate) {

    return !schedule.some(item =>

        item.department_id === candidate.department_id &&
        item.semester === candidate.semester &&
        item.section === candidate.section &&
        item.day_of_week === candidate.day_of_week &&
        item.start_time === candidate.start_time
    );
}

module.exports = {

    isFacultyAvailable,

    isRoomAvailable,

    isSectionAvailable

};