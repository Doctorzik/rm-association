const { Event } = require("../models/models");
const singleDocument = async (req, res, next) => {
  let event;
  try {
    event = await Event.findById(req.params.id);

    if (event == null) {
      return res.status(404).json({ message: "Cannot find Event" });
    }
  } catch (error) {
    return res.status(500).json({ messsage: error.message });
  }

  res.event = event;

  next();
};

module.exports = {
  singleDocument,
};
