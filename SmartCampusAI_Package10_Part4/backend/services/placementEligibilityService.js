const academicRepository =
    require("../models/StudentAcademicRepository");

const driveRepository =
    require("../models/PlacementDriveRepository");

function normalize(value) {
    return String(value || "")
        .trim()
        .toLowerCase();
}

function departmentAllowed(
    studentDepartment,
    allowedDepartments
) {
    if (!allowedDepartments) {
        return true;
    }

    const student =
        normalize(studentDepartment);

    const departments =
        String(allowedDepartments)
            .split(",")
            .map(normalize)
            .filter(Boolean);

    return departments.includes(student);
}

async function check(
    driveId,
    studentUserId
) {
    const drive =
        await driveRepository.findById(
            driveId
        );

    if (!drive) {
        throw new Error(
            "Placement drive not found"
        );
    }

    const academic =
        await academicRepository.findByUserId(
            studentUserId
        );

    if (!academic) {
        return {
            eligible: false,
            reason:
                "Academic profile not found.",
            criteria: {
                minimumCgpa:
                    drive.eligibility_min_cgpa,
                departments:
                    drive.eligibility_departments,
                maximumBacklogs:
                    drive.eligibility_backlogs
            }
        };
    }

    const cgpa =
        Number(academic.cgpa || 0);

    const backlogs =
        Number(academic.backlogs || 0);

    const minimumCgpa =
        drive.eligibility_min_cgpa === null
            ? null
            : Number(
                drive.eligibility_min_cgpa
            );

    const maximumBacklogs =
        Number(
            drive.eligibility_backlogs || 0
        );

    const checks = {
        cgpa:
            minimumCgpa === null ||
            cgpa >= minimumCgpa,

        department:
            departmentAllowed(
                academic.department,
                drive.eligibility_departments
            ),

        backlogs:
            backlogs <= maximumBacklogs
    };

    let reason = "Eligible";

    if (!checks.cgpa) {
        reason =
            `Minimum CGPA required: ${minimumCgpa}`;
    } else if (!checks.department) {
        reason =
            "Your department is not eligible for this drive.";
    } else if (!checks.backlogs) {
        reason =
            `Maximum allowed backlogs: ${maximumBacklogs}`;
    }

    return {
        eligible:
            checks.cgpa &&
            checks.department &&
            checks.backlogs,

        reason,

        student: {
            cgpa,
            department:
                academic.department,
            backlogs
        },

        criteria: {
            minimumCgpa,
            departments:
                drive.eligibility_departments,
            maximumBacklogs
        },

        checks
    };
}

module.exports = {
    check
};
