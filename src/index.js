const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./database/database");
const adminRoutes = require("./routes/administration/admin");
const staffRoutes = require("./routes/administration/manageStaffs");
const carerRoutes = require("./routes/administration/carer");
const endUser = require("./routes/user/EndUser");
const reportRoutes = require("./routes/user/reports");
const serviceRoute = require("./routes/administration/services");

// env config
dotenv.config({ path: "config/config.env" });

// body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connecting to db
connectDB();

app.get("/", (req, res) => {
  res.send("hey");
});

app.use("/api/staff", staffRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/carer", carerRoutes);

app.use("/api/user", endUser);

app.use("/api/service", serviceRoute);

app.use("/api/report", reportRoutes);

app.use("/profile", express.static("uploads/images"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
