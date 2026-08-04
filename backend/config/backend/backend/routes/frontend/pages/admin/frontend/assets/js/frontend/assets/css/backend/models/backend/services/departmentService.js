const Department = require("../models/Department");

async function getDepartments() {

    return await Department.findAll();

}

async function createDepartment(name) {

    return await Department.create(name);

}

async function updateDepartment(id, name) {

    return await Department.update(id, name);

}

async function deleteDepartment(id) {

    return await Department.remove(id);

}

module.exports = {

    getDepartments,

    createDepartment,

    updateDepartment,

    deleteDepartment

};
