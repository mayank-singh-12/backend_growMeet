const mongoose = require("mongoose");

const EventsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    type: { type: String, enum: ["offline", "online"], required: true },
    imgUrl: { type: String, required: true },
    details: { type: String, required: true },
    price: { type: Number, default: 0 },
    venue: { type: String, required: true },
    address: { type: String, required: true },
    dressCode: { type: String, required: true },
    ageRestrictions: { type: String, required: true },
    host: { type: mongoose.Schema.Types.ObjectId, ref: "hosts", required: true },
    speakers: [
      { type: mongoose.Schema.Types.ObjectId, ref: "speakers", required: true },
    ],
    tags: [{ type: String, required: true }],
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
  { 
    timestamps: true,
  }
);

const Events = mongoose.model("Events", EventsSchema);
module.exports = Events;
