require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("==================================");
    console.log(" Smart Campus AI Server Started");
    console.log("==================================");
    console.log(`Running on http://localhost:${PORT}`);
});