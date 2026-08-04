const Faculty = require("../models/Faculty");

async function getFaculty() {
    return await Faculty.findAll();
}

async function createFaculty(data) {
    return await Faculty.create(data);
}

module.exports = {
    getFaculty,
    createFaculty
};