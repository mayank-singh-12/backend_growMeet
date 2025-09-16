const { initializeDatabase } = require("./db/db.connect");
require("dotenv").config();
const fs = require("fs");
const Events = require("./models/events.models");
const Hosts = require("./models/host.models");
const Speakers = require("./models/speakers.models");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

initializeDatabase();

// SEEDING DATA

const hostsJson = fs.readFileSync("./hosts.json");
const speakersJson = fs.readFileSync("./speakers.json");
const eventsJson = fs.readFileSync("./events.json");

const hostData = JSON.parse(hostsJson);
const speakersData = JSON.parse(speakersJson);
const eventsData = JSON.parse(eventsJson);

async function addNewHost(hostData) {
  try {
    const newHost = new Hosts(hostData);
    await newHost.save();
    console.log("Host saved successfully.");
  } catch (error) {
    console.log(error);
  }
}

async function addNewSpeaker(speakerData) {
  try {
    const newSpeaker = new Speakers(speakerData);
    await newSpeaker.save();
    console.log("Speaker saved successfully.");
  } catch (error) {
    console.log(error);
  }
}

async function addNewEvent(eventsData) {
  try {
    const newEvent = new Events(eventsData);
    await newEvent.save();
    console.log("Event saved successfully.");
  } catch (error) {
    console.log(error);
  }
}

function seedData(records, addFunc) {
  for (const record of records) {
    addFunc(record);
  }
}

// seedData(eventsData, addNewEvent);

// ALL EVENTS ROUTE
async function getAllEvents() {
  try {
    const events = await Events.find();
    if (!events) {
      throw "Unable to query events.";
    }
    return events;
  } catch (error) {
    console.log("Error in db while querying all Events:", error);
  }
}

app.get("/events", async (req, res) => {
  try {
    const events = await getAllEvents();
    if (!events) {
      res.status(404).json({ error: "No Events Found!" });
    } else {
      res.status(200).json(events);
    }
  } catch {
    res.status(500).json({ error: "Error occured while fetching events." });
  }
});

// GET EVENT BY EVENT ID
async function getEventById(eventId) {
  try {
    const event = await Events.findById(eventId).populate([
      { path: "host" },
      { path: "speakers" },
    ]);
    return event;
  } catch (error) {
    console.log("Error in db while querying Event by id.", error);
  }
}

app.get("/events/:eventId", async (req, res) => {
  try {
    const eventData = await getEventById(req.params.eventId);

    if (!eventData) {
      res.status(404).json({ error: "Event not found." });
    } else {
      res.status(200).json(eventData);
    }
  } catch {
    res.status(500).json({ error: "Error occured while fetching Event data." });
  }
});

// RUNNING SERVER
const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server running on port: ", port);
});
