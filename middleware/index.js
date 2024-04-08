const { Event, Member, Attendance, MissionaryExperience } = require("../models/models");
const { model, Schema } = require("mongoose");

const eventSingleDocument = async (req, res, next) => {
  let event;
  try {
    event = await EventById(req.params.id);

    if (event == null) {
      return res.status(404).json({ message: "Cannot find Member" });
    }
  } catch (error) {
    return res.status(500).json({ messsage: error.message });
  }

  res.event = event;

  next();
};
const memberSingleDocument = async (req, res, next) => {
  let member;
  try {
    member = await Member.findById(req.params.id);

    if (member == null) {
      return res.status(404).json({ message: "Cannot find Member" });
    }
  } catch (error) {
    return res.status(500).json({ messsage: error.message });
  }

  res.member = member;

  next();
};

const attendanceSingleDocument = async (req, res, next) => {
  let attendance;
  try {
    attendance = await Attendance.findById(req.params.id);

    if (attendance == null) {
      return res.status(404).json({ message: "Cannot find attendance" });
    }
  } catch (error) {
    return res.status(500).json({ messsage: error.message });
  }

  res.attendance = attendance;

  next();
};
const missionaryExperienceSingleDocument = async (req, res, next) => {
  let missionaryExperience;
  try {
    missionaryExperience = await MissionaryExperience.findById(req.params.id);

    if (missionaryExperience == null) {
      return res.status(404).json({ message: "Cannot find Missionary experience" });
    }
  } catch (error) {
    return res.status(500).json({ messsage: error.message });
  }

  res.missionaryExperience = missionaryExperience;

  next();
};



module.exports = {
  eventSingleDocument,
  memberSingleDocument,
  attendanceSingleDocument,
  missionaryExperienceSingleDocument
};
