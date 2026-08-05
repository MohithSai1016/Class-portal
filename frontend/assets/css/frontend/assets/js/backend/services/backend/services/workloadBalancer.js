function balance(assignments) {

    const facultyLoad = {};

    assignments.forEach(item => {

        facultyLoad[item.faculty_id] =
            (facultyLoad[item.faculty_id] || 0) + 1;

    });

    return assignments.sort((a, b) =>

        facultyLoad[a.faculty_id] -
        facultyLoad[b.faculty_id]

    );
}

module.exports = {

    balance

};