const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./database/database");
const staffRoutes = require("./routes/administration/manageStaffs");
const endUserRoutes = require("./routes/user/EndUser");
const staffPhoto = require("./routes/administration/photo");
const carerDocumentRoutes = require("./routes/administration/carerdoc");
const userPhoto = require("./routes/user/photo");
const reportRoutes = require("./routes/user/reports");
const serviceRoutes = require("./routes/administration/services");
const kbRoutes = require("./routes/administration/kbCategory");
const kbSubRoutes = require("./routes/administration/kbSubCat");
// env config
dotenv.config({ path: "config/config.env" });

// cors
const corsOptions = {
  origin: ["http://3.21.210.66", "http://localhost:4200"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/profile/staff", express.static("uploads/images/staff"));
app.use("/profile/user", express.static("uploads/images/user"));
app.use("/kbdocuments", express.static("uploads/kbdocuments"));
// connecting to db
connectDB();

app.get("/", (req, res) => {
  res.send("hey");
});

app.use("/api/staff", staffRoutes);

app.use("/api/staff/photo", staffPhoto);

app.use("/api/carer/document", carerDocumentRoutes);

app.use("/api/user", endUserRoutes);

app.use("/api/user/photo", userPhoto);

app.use("/api/service", serviceRoutes);

app.use("/api/report", reportRoutes);

app.use("/api/kb/category", kbRoutes);

app.use("/api/kb/subcategory", kbSubRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
