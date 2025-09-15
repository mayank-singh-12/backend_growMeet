const mongoose = require("mongoose");

const speakerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  imgUrl: { type: String, required: true },
});

const Speakers = mongoose.model("speakers", speakerSchema);

module.exports = Speakers;
