const companyRepository =
    require("../models/PlacementCompanyRepository");

const driveRepository =
    require("../models/PlacementDriveRepository");

const DRIVE_STATUSES = new Set([
    "Draft",
    "Open",
    "Closed",
    "Completed",
    "Cancelled"
]);

async function listOpen(filters) {
    return driveRepository.listOpen(filters);
}

async function get(id) {
    const drive =
        await driveRepository.findById(id);

    if (!drive) {
        throw new Error(
            "Placement drive not found"
        );
    }

    return drive;
}

async function createDrive(data) {
    if (!data.companyId) {
        throw new Error(
            "companyId is required"
        );
    }

    if (!data.driveTitle) {
        throw new Error(
            "driveTitle is required"
        );
    }

    if (!data.roleTitle) {
        throw new Error(
            "roleTitle is required"
        );
    }

    if (!data.driveDate) {
        throw new Error(
            "driveDate is required"
        );
    }

    if (!data.applicationDeadline) {
        throw new Error(
            "applicationDeadline is required"
        );
    }

    if (
        data.driveStatus &&
        !DRIVE_STATUSES.has(
            data.driveStatus
        )
    ) {
        throw new Error(
            "Invalid drive status"
        );
    }

    const company =
        await companyRepository.findById(
            Number(data.companyId)
        );

    if (!company) {
        throw new Error(
            "Company not found"
        );
    }

    const id =
        await driveRepository.create(
            data
        );

    return driveRepository.findById(id);
}

async function apply(
    driveId,
    studentUserId
) {
    const drive =
        await driveRepository.findById(
            driveId
        );

    if (
        !drive ||
        drive.drive_status !== "Open"
    ) {
        throw new Error(
            "Drive is not open"
        );
    }

    if (
        new Date(drive.application_deadline)
        < new Date()
    ) {
        throw new Error(
            "Application deadline has passed"
        );
    }

    if (
        await driveRepository.hasApplied(
            driveId,
            studentUserId
        )
    ) {
        throw new Error(
            "Already applied to this drive"
        );
    }

    const id =
        await driveRepository.apply(
            driveId,
            studentUserId
        );

    return {
        id,
        drive
    };
}

async function myApplications(
    studentUserId
) {
    return driveRepository.myApplications(
        studentUserId
    );
}

module.exports = {
    listOpen,
    get,
    createDrive,
    apply,
    myApplications
};
