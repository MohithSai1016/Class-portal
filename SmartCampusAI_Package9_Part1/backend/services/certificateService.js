const crypto = require("crypto");

const repository =
    require("../models/CertificateRepository");

function createVerificationCode() {
    return `SCAI-${crypto.randomBytes(8).toString("hex").toUpperCase()}`;
}

async function create(data) {
    if (
        !data.studentUserId ||
        !data.certificateType ||
        !data.title ||
        !data.issuingOrganization ||
        !data.issueDate
    ) {
        throw new Error(
            "studentUserId, certificateType, title, issuingOrganization and issueDate are required"
        );
    }

    const verificationCode =
        data.verificationCode ||
        createVerificationCode();

    return repository.create({
        ...data,
        verificationCode
    });
}

async function getStudentCertificates(studentUserId) {
    return repository.findByStudent(studentUserId);
}

async function getAll(filters) {
    return repository.findAll(filters);
}

async function getById(id) {
    const certificate =
        await repository.findById(id);

    if (!certificate) {
        throw new Error("Certificate not found");
    }

    return certificate;
}

async function revoke(id) {
    const updated =
        await repository.updateStatus(
            id,
            "Revoked"
        );

    if (!updated) {
        throw new Error("Certificate not found");
    }

    return true;
}

async function verify(code) {
    if (!code) {
        throw new Error(
            "Verification code is required"
        );
    }

    const certificate =
        await repository.findByVerificationCode(code);

    if (!certificate) {
        return {
            valid: false,
            certificate: null
        };
    }

    return {
        valid: certificate.status === "Issued",
        certificate
    };
}

module.exports = {
    create,
    getStudentCertificates,
    getAll,
    getById,
    revoke,
    verify
};
