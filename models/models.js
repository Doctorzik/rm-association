const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  hash: String,
  salt: String,
});

const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const memberSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    // Validate email format using regex
    match: [/\S+@\S+\.\S+/, "Please enter a valid email"],
  },

  missionServed: {
    type: String,
    required: true,
  },
  missionPresident: [
    {
      type: String,
    },
  ],
  returnDate: {
    type: Date,
    required: true,
  },
  currentLocation: {
    type: String,
    required: true,
  },
  hobbies: [String],

  bestquote: {
    type: String,
    required: true,
    default: "I Love my Mission",
  },
});






// Define the schema for the Attendance collection
const attendanceSchema = new Schema({
  eventId: {
    type: Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  memberId: {
    type: Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
  status: {
    type: String,
    enum: ["present", "absent", "RSVP"],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
// Define the schema for the Missionary Experience collection
const missionaryExperienceSchema = new Schema({
  memberId: {
      type: Schema.Types.ObjectId,
      ref: 'Member',
      required: true
  },
  areaCompanion: [ {
      type: String,
      required: true
  }],
  dateOfExperience: {
      type: Date,
      
  },
  description: {
      type: String,
      required: true
  }
});
// Create a Mongoose model based on the schema

// Create a Mongoose model based on Attendance  schema
const Attendance = model("Attendance", attendanceSchema);
// Create a Mongoose model based on Member  schema

const Member = model("Member", memberSchema);
// Create a Mongoose model based on Event  schema

const Event = model("Event", eventSchema);

const User = model("User", userSchema);

<<<<<<< HEAD
// Create a Mongoose model based on the schema
const MissionaryExperience = model('MissionaryExperience', missionaryExperienceSchema);
=======
>>>>>>> 09167c71ebc1f9f1586b79c58364faf61b21034a


module.exports = {
  MissionaryExperience,
  Event,
  Member,
  Attendance,
  User,
};
