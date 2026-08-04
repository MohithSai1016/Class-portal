async function create(req, res) {

    const id = await studentService.createStudent(req.body);

    res.status(201).json({
        success: true,
        id
    });

}

async function update(req, res) {

    await studentService.updateStudent(
        req.params.id,
        req.body
    );

    res.json({
        success: true
    });

}

async function remove(req, res) {

    await studentService.deleteStudent(
        req.params.id
    );

    res.json({
        success: true
    });

}
module.exports = {
    dashboard,
    listStudents,
    create,
    update,
    remove
};