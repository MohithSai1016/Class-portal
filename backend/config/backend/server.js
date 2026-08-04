require("dotenv").config();

const app = require("./app");

const validateEnvironment = require("./config/envValidator");

const { initializeDatabase } = require("./config/db");

const PORT = process.env.PORT || 5000;

async function start() {

    validateEnvironment();

    await initializeDatabase();

    app.listen(PORT, () => {

        console.log("=======================================");
        console.log(" Smart Campus AI Backend Started");
        console.log("=======================================");
        console.log(`Running at http://localhost:${PORT}`);

    });

}

start();