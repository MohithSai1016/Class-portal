const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {

    res.json({

        application: "Smart Campus AI",

        status: "Running"

    });

});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/student", require("./routes/studentRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

app.use(errorMiddleware);

module.exports = app;
app.use(
    "/api/faculty",
    require("./routes/facultyRoutes")
);
app.use(
    "/api/subjects",
    require("./routes/subjectRoutes")
);