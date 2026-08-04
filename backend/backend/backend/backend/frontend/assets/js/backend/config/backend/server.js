require("dotenv").config();

const app = require("./app");

const {
    initializeDatabase
} = require("./config/db");

const PORT = process.env.PORT || 5000;

async function startServer() {

    await initializeDatabase();

    app.listen(PORT, () => {

        console.log("==================================");
        console.log(" Smart Campus AI Server Running");
        console.log("==================================");
        console.log(`http://localhost:${PORT}`);

    });

}

startServer();