const repository =
    require("../models/FinalPlacementReportRepository");

async function generate(req,res) {
    try {
        const report =
            await repository.generateSnapshot(
                req.user.id,
                req.body.reportName ||
                "Final Placement Report"
            );

        res.status(201).json({
            success:true,
            report
        });
    } catch(error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

async function list(req,res) {
    try {
        res.json({
            success:true,
            reports:
                await repository.list()
        });
    } catch(error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

module.exports={
    generate,
    list
};
