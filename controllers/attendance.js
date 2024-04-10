const { Attendance } = require("../models/models");

const getSingleAttendanceById = async (req, res) => {
   // #swagger.tags = ['Attendance']
  res.json(res.attendance);
};

const getAllAttendances = async (req, res) => {
  try {
    const allAttendances = await Attendance.find();
    res.status(200).json(allAttendances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createAttendance = async (req, res) => {
  Attendance.validate(req.body)
    .then((validatedData) => {
      // The document passed validation

      const attendance = new Attendance(validatedData);
      attendance.save().then(() => {
        res.send().status(201);
      });
    })
    .catch((validationError) => {
      // The document failed validation
      res.status(400).json({ error: validationError.message });
    });
};

const deleteAttendance = async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(res.attendance._id);

    res.status(200).json({ message: "Attendance successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateAttendance = async (req, res) => {
  try {
    await Attendance.findByIdAndUpdate(res.attendance._id, req.body);
    res.status(202).json({ message: "Successfully Updated" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  createAttendance,
  getAllAttendances,
  getSingleAttendanceById,
  deleteAttendance,
  updateAttendance,
};
