function calculateWorkload(assignments) {

    const workload = {};

    assignments.forEach(item => {

        if (!workload[item.faculty_id]) {

            workload[item.faculty_id] = 0;

        }

        workload[item.faculty_id]++;

    });

    return workload;

}

module.exports = {

    calculateWorkload

};