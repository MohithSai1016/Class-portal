const certificateService =
    require("./certificateService");

async function issueBulk(data) {
    const recipients =
        Array.isArray(data.students)
            ? data.students
            : [];

    if (!recipients.length) {
        throw new Error(
            "students must contain at least one student"
        );
    }

    const results = [];
    const failed = [];

    for (const student of recipients) {
        try {
            const certificateId =
                await certificateService.create({
                    studentUserId:
                        student.studentUserId,
                    certificateType:
                        data.certificateType,
                    title:
                        data.title,
                    description:
                        data.description,
                    issuingOrganization:
                        data.issuingOrganization,
                    issueDate:
                        data.issueDate,
                    certificateNumber:
                        student.certificateNumber
                });

            results.push({
                studentUserId:
                    student.studentUserId,
                certificateId
            });
        } catch (error) {
            failed.push({
                studentUserId:
                    student.studentUserId,
                message:
                    error.message
            });
        }
    }

    return {
        requested: recipients.length,
        issued: results.length,
        failed,
        results
    };
}

module.exports = {
    issueBulk
};
