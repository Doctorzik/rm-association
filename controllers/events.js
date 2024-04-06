const database = require("../config/config");
const { Event } = require("../models/models");

const getSingleEventById = async (req, res) => {
  res.json(res.event);
};

const getAllEvents = async (req, res) => {
  try {
    const allEvents = await Event.find();
    res.status(200).json(allEvents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    event.save().then(() => {
      res.send().status(201);
    });
  } catch (error) {
    res.send().status(500).json({ message: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(res.event._id);

    res.status(200).json({ message: "Event successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateEvent = async (req, res) => {
  
  try {
    await Event.findByIdAndUpdate(res.event._id, req.body);
    res.status(202).json({ message: "Successfully Updated" });
  } catch (error) {}
};

module.exports = {
  createEvent,
  getAllEvents,
  getSingleEventById,
  deleteEvent,
  updateEvent,
};
