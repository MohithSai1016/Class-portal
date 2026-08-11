const repository =
    require("../models/CertificateAuditRepository");

async function record(
    certificateId,
    actorUserId,
    action,
    details = null
) {
    return repository.create({
        certificateId,
        actorUserId,
        action,
        details
    });
}

async function history(certificateId) {
    return repository.findByCertificate(
        certificateId
    );
}

module.exports = {
    record,
    history
};
