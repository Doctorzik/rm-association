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
  Event.validate(req.body)
    .then((validatedData) => {
      // The document passed validation
   
      const event = new Event(validatedData);
      event.save().then(() => {
        res.send().status(201);
      });
    })
    .catch((validationError) => {
      // The document failed validation
      res.status(400).json({ error: validationError.message });
    });
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
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getSingleEventById,
  deleteEvent,
  updateEvent,
};
