const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    express.static(
        path.join(__dirname, "../frontend")
    )
);

app.get("/", (req, res) => {

    res.sendFile(

        path.join(
            __dirname,
            "../frontend/index.html"
        )

    );

});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/student", require("./routes/studentRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));

app.use(errorMiddleware);

module.exports = app;
app.use("/api/analytics", require("./routes/analyticsRoutes"));
app.use(

"/api/ai-scheduler",

require("./routes/aiSchedulerRoutes")

);
app.use(
    "/api/gradebook",
    require("./routes/gradebookRoutes")
);
app.use(
"/api/marks-entry",
require("./routes/marksEntryRoutes")
);
app.use(

"/api/results",

require("./routes/resultRoutes")

);