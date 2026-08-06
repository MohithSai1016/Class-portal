const StudentTimetable =
require("../models/StudentTimetable");

const FacultyTimetable =
require("../models/FacultyTimetable");

async function student(req, res) {

    const timetable =
        await StudentTimetable.findByRollNumber(
            req.params.rollNumber
        );

    res.json({
        success: true,
        timetable
    });
}

async function faculty(req, res) {

    const timetable =
        await FacultyTimetable.findByEmployeeId(
            req.params.employeeId
        );

    res.json({
        success: true,
        timetable
    });
}

module.exports = {
    student,
    faculty
};