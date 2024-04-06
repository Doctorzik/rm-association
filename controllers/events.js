const database = require("../config/config");
const { Event } = require("../models/models");

const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    event.save().then(() => {
      res.send().status(201);
    });
  } catch (error) {
    console.log(`Here is your error ${error}`);
  }
};

module.exports = { createEvent };
