const dotenv = require("dotenv");

dotenv.config();

const mongoose = require("mongoose");

mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/costradamus-db",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(console.log("Connected"))
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose.connection;
