const repository =
    require("../models/ReceiptRepository");

async function list(req, res) {
    try {
        const receipts =
            await repository.findByStudentId(
                req.params.studentId
            );

        res.json({
            success: true,
            receipts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to load receipts"
        });
    }
}

module.exports = { list };
