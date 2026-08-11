const repository =
    require("../models/CertificateAdminRepository");

const certificateService =
    require("./certificateService");

async function search(filters) {
    return repository.search(filters);
}

async function statistics() {
    const certificates =
        await repository.search({});

    const byType =
        await repository.countByType();

    const issued =
        certificates.filter(
            c => c.status === "Issued"
        ).length;

    const revoked =
        certificates.filter(
            c => c.status === "Revoked"
        ).length;

    const pending =
        certificates.filter(
            c => c.status === "Pending"
        ).length;

    return {
        total: certificates.length,
        issued,
        revoked,
        pending,
        byType
    };
}

async function issue(data) {
    return certificateService.create({
        ...data,
        status: "Issued"
    });
}

module.exports = {
    search,
    statistics,
    issue
};
