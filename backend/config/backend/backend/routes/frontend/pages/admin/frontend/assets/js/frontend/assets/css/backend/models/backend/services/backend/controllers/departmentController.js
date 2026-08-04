const departmentService =
require("../services/departmentService");

async function list(req, res) {

    const departments =
        await departmentService.getDepartments();

    res.json({

        success: true,

        departments

    });

}

async function create(req, res) {

    const id =
        await departmentService.createDepartment(
            req.body.name
        );

    res.status(201).json({

        success: true,

        id

    });

}

async function update(req, res) {

    await departmentService.updateDepartment(

        req.params.id,

        req.body.name

    );

    res.json({

        success: true

    });

}

async function remove(req, res) {

    await departmentService.deleteDepartment(

        req.params.id

    );

    res.json({

        success: true

    });

}

module.exports = {

    list,

    create,

    update,

    remove

};