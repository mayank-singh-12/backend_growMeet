const mongoose = require("mongoose");
require("dotenv").config();
const mongoUri = process.env.MONGODB;

async function initializeDatabase() {
  await mongoose
    .connect(mongoUri)
    .then(() => console.log("Connected to database successsfully."))
    .catch((error) => console.log("Unable to connect to database: ", error));
}

module.exports = { initializeDatabase };
