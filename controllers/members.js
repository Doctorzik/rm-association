const { Member } = require("../models/models");

const getSingleMemberById = async (req, res) => {
  console.log(res.member);
  res.json(res.member);
};

const getAllMembers = async (req, res) => {
  try {
    const allMembers = await Member.find();
    res.status(200).json(allMembers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMember = async (req, res) => {
  Member.validate(req.body)
    .then((validatedData) => {
      // The document passed validation

      const member = new Member(validatedData);
      member.save().then(() => {
        res.send().status(201);
      });
    })
    .catch((validationError) => {
      // The document failed validation
      res.status(400).json({ error: validationError.message });
    });
};

const deleteMember = async (req, res) => {
  try {
    await Member.findByIdAndDelete(res.member._id);

    res.status(200).json({ message: "Member successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateMember = async (req, res) => {
  try {
    await Member.findByIdAndUpdate(res.member._id, req.body);
    res.status(202).json({ message: "Successfully Updated" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  createMember,
  getAllMembers,
  getSingleMemberById,
  deleteMember,
  updateMember,
};
