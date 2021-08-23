const express = require("express");
const app = express();
const dotenv = require("dotenv");
const adminRoutes = require("./Routes/administration/admin");
// const hrRoutes = require("./Routes/administration/hr");
// const managerRoute = require("./Routes/administration/manager");
// const financeRoute = require("./Routes/administration/finance");
// const support = require("./Routes/administration/support");
const staffRegisterRoutes = require("./Routes/administration/registerStaff");
const staffLoginRoutes = require("./Routes/administration/loginStaff");
const staffUpdateRoutes = require("./Routes/administration/updateStaff");
const staffPasswordRoutes = require("./Routes/administration/changePassword");
const staffDeleteRoutes = require("./Routes/administration/deleteStaff");
const staffViewRoutes = require("./Routes/administration/viewStaffs");
const staffProfileRoutes = require("./Routes/administration/viewProfile");
const User = require("./Routes/User/EndUser");
const connectDB = require("./Database/database");

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

// routes
// app.use("/api/admin", adminRoutes);
// app.use("/api/hr", hrRoutes);
// app.use("/api/manager", managerRoute);
// app.use("/api/finance", financeRoute);
// app.use("/api/support",support);

app.use("/api/admin", adminRoutes);
app.use("/api/register", staffRegisterRoutes);
app.use("/api/login", staffLoginRoutes);
app.use("/api/update/details", staffUpdateRoutes);
app.use("/api/update/password", staffPasswordRoutes);
app.use("/api/account/delete", staffDeleteRoutes);
app.use("/api/staff/view", staffViewRoutes);
app.use("/api/staff/profile", staffProfileRoutes);
app.use("/api/user",User);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
