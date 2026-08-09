const repository = require("../models/FeePlanRepository");

async function getInstallments(studentFeeId) {
    return repository.getInstallments(studentFeeId);
}

async function createInstallment(data) {
    if (!data.studentFeeId || !data.installmentNumber ||
        !data.dueDate || !Number(data.amount)) {
        throw new Error("All installment fields are required");
    }

    return repository.createInstallment(data);
}

module.exports = {
    getInstallments,
    createInstallment
};
