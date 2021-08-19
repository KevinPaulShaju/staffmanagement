const express = require("express");
const app = express();
const dotenv = require("dotenv");
const adminRoutes = require("./Routes/administration/admin");
const hrRoutes = require("./Routes/administration/hr");
const managerRoute = require("./Routes/administration/manager");
const financeRoute = require("./Routes/administration/finance");
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
app.use("/api/admin", adminRoutes);
app.use("/api/hr", hrRoutes);
app.use("/api/manager", managerRoute);
app.use("/api/finance", financeRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
