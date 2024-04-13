const me = require("mongoose").isValidObjectId;
const { MissionaryExperience } = require("../models/models");

const createExperience = async (req, res) => {
  MissionaryExperience.validate(req.body)
    .then((validbody) => {
      const missionExperience = new MissionaryExperience(validbody);

      missionExperience.save().then(() => {
        res.status(201).json({ message: "Experinece Saved" });
      });
    })
    .catch((error) => {
      // The document failed validation
      res.status(400).json({ error: error.message });
    });
};
const getAllExperience = async (req, res) => {
  try {
    const allExperience = await MissionaryExperience.find();

    res.status(200).json(allExperience);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMemberExperience = async (req, res) => {
  const memberId = req.params.id;
  if (me(memberId) === false) {
    return res.status(400).json("Bad objectId");
  } else {
    try {
      const memberExperience = await MissionaryExperience.find({
        memberId: memberId,
      }).populate("memberId");
      if (memberExperience) {
        res.status(200).json(memberExperience);
      } else {
        res.status(400).json({ message: "No such member" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

const deleteExperience = async (req, res) => {
  try {
    await MissionaryExperience.findByIdAndDelete(res.missionaryExperience._id);
    res.json({ message: "Missionary Experience deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const patchExperience = async (req, res) => {
  if (req.body.memberId != null) {
    res.missionaryExperience.memberId = req.body.memberId;
  }
  if (req.body.areaCompanion != null) {
    res.missionaryExperience.areaCompanion = req.body.areaCompanion;
  }
  if (req.body.dateOfExperience != null) {
    res.missionaryExperience.dateOfExperience = req.body.dateOfExperience;
  }
  if (req.body.description != null) {
    res.missionaryExperience.description = req.body.description;
  }
  try {
    const updatedExperience = await new MissionaryExperience(req.body);
    res.json(updatedExperience);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createExperience,
  getAllExperience,
  getMemberExperience,
  deleteExperience,
  patchExperience,
};
