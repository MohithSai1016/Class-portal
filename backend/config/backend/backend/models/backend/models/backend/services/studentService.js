const Student = require("../models/Student");

async function getStudents() {
    return await Student.findAll();
}

async function createStudent(student) {
    return await Student.create(student);
}

async function updateStudent(id, student) {
    return await Student.update(id, student);
}

async function deleteStudent(id) {
    return await Student.remove(id);
}

module.exports = {
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent
};