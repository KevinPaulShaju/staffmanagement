const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./database/database");
const adminRoutes = require("./routes/administration/admin");
const staffRoutes = require("./routes/administration/manageStaffs");
const endUser = require("./routes/user/EndUser");
const staffPhoto = require("./routes/administration/photo");
const carerDocument = require("./routes/administration/carerdoc");
const userPhoto = require("./routes/user/photo");
const reportRoutes = require("./routes/user/reports");
const serviceRoute = require("./routes/administration/services");

// env config
dotenv.config({ path: "config/config.env" });

// cors
const corsOptions = {
  origin: "http://localhost:5000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/profile/staff", express.static("uploads/images/staff"));
app.use("/profile/user", express.static("uploads/images/user"));
// connecting to db
connectDB();

app.get("/", (req, res) => {
  res.send("hey");
});

app.use("/api/staff", staffRoutes);

app.use("/api/staff/photo", staffPhoto);

app.use("/api/carer/document",carerDocument);

app.use("/api/admin", adminRoutes);

app.use("/api/user", endUser);

app.use("/api/user/photo", userPhoto);

app.use("/api/service", serviceRoute);

app.use("/api/report", reportRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
