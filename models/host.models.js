const mongoose = require("mongoose");

const hostSchema = new mongoose.Schema({
  name: { type: String, required: true },
  about: { type: String, required: true },
});

const Hosts = mongoose.model("hosts", hostSchema);

module.exports = Hosts;
