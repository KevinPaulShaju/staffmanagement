const express = require("express");
const app = express();
const dotenv = require("dotenv");
const adminRoutes = require("./Routes/administration/admin");
const connectDB = require("./Database/database");

// env config
dotenv.config({ path: "config/config.env" });

// body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connecting to db
connectDB();

app.get('/',(req, res) => {
  res.send("hey");
});

// routes
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
