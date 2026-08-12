const repository =
    require("../models/PlacementAnalyticsRepository");

async function get() {
    const [
        overview,
        companies,
        departments,
        statuses
    ] = await Promise.all([
        repository.overview(),
        repository.companyStats(),
        repository.departmentStats(),
        repository.statusStats()
    ]);

    return {
        overview,
        companies,
        departments,
        statuses
    };
}

module.exports={get};
