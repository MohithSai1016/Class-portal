const certificateService =
    require("./certificateService");

const auditService =
    require("./certificateAuditService");

async function issue(data, actorUserId) {
    const certificateId =
        await certificateService.create(data);

    await auditService.record(
        certificateId,
        actorUserId,
        "ISSUED",
        {
            title: data.title,
            studentUserId:
                data.studentUserId
        }
    );

    return certificateId;
}

async function revoke(
    certificateId,
    actorUserId
) {
    await certificateService.revoke(
        certificateId
    );

    await auditService.record(
        certificateId,
        actorUserId,
        "REVOKED"
    );

    return true;
}

async function recordPdfGenerated(
    certificateId,
    actorUserId,
    filePath
) {
    await auditService.record(
        certificateId,
        actorUserId,
        "PDF_GENERATED",
        { filePath }
    );
}

async function recordFileUploaded(
    certificateId,
    actorUserId,
    filePath
) {
    await auditService.record(
        certificateId,
        actorUserId,
        "FILE_UPLOADED",
        { filePath }
    );
}

module.exports = {
    issue,
    revoke,
    recordPdfGenerated,
    recordFileUploaded
};
