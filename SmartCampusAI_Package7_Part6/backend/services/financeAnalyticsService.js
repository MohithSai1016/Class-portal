const repository = require("../models/FinanceAnalyticsRepository");

async function dashboard() {
    const [summary, monthlyCollections, overdue] = await Promise.all([
        repository.summary(),
        repository.monthlyCollections(),
        repository.overdue()
    ]);

    return { summary, monthlyCollections, overdue };
}

module.exports = { dashboard };
