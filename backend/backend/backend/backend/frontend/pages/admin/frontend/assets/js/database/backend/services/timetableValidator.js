function hasConflict(schedule, entry) {

    return schedule.some(item => {

        const sameDay =
            item.day_of_week === entry.day_of_week;

        const sameTime =
            item.start_time === entry.start_time &&
            item.end_time === entry.end_time;

        if (!(sameDay && sameTime)) {
            return false;
        }

        if (item.faculty_id === entry.faculty_id) {
            return true;
        }

        if (item.classroom_id === entry.classroom_id) {
            return true;
        }

        return (
            item.department_id === entry.department_id &&
            item.semester === entry.semester &&
            item.section === entry.section
        );
    });
}

module.exports = {
    hasConflict
};