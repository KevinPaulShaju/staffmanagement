const mongoose = require("mongoose");

const connectDB = async () => {
  const DB = "mongodb://127.0.0.1:27017/demo01";
  try {
    const conn = await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });
    console.log(`Database connection established on ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
