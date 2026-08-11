const service =
    require("../services/certificateService");

async function myCertificates(req, res) {
    try {
        const certificates =
            await service.getStudentCertificates(
                req.user.id
            );

        res.json({
            success: true,
            certificates
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function getById(req, res) {
    try {
        const certificate =
            await service.getById(req.params.id);

        if (
            req.user.role === "student" &&
            Number(certificate.student_user_id) !==
                Number(req.user.id)
        ) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

        res.json({
            success: true,
            certificate
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
}

async function create(req, res) {
    try {
        const id =
            await service.create(req.body);

        res.status(201).json({
            success: true,
            certificateId: id
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function list(req, res) {
    try {
        const certificates =
            await service.getAll(req.query);

        res.json({
            success: true,
            certificates
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function revoke(req, res) {
    try {
        await service.revoke(req.params.id);

        res.json({
            success: true
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
}

async function verify(req, res) {
    try {
        const result =
            await service.verify(
                req.params.code
            );

        res.json({
            success: true,
            ...result
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    myCertificates,
    getById,
    create,
    list,
    revoke,
    verify
};
