app.use(

"/api/timetable-search",

require("./routes/timetableSearchRoutes")

);
app.use(

"/api/fees",

require("./routes/feeRoutes")

);
app.use(

"/api/payments",

require("./routes/paymentRoutes")

);