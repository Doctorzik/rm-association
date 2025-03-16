const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  email: { type: String, required: true, unique: true }, 
  username: { type: String, required: true },
  hash: String, // Used for local authentication
  salt: String, 
  googleId: { type: String, unique: true, sparse: true },
  githubId: { type: String, unique: true, sparse: true },
});

const eventSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
});

const memberSchema = new Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    match: [/\S+@\S+\.\S+/, "Please enter a valid email"]
  },
  missionServed: { type: String, required: true },
  missionPresident: { type: [String], default: [] },
  returnDate: { type: Date, required: true },
  currentLocation: { type: String, required: true },
  hobbies: { type: [String], default: [] },
  bestquote: { type: String, default: "I Love my Mission" },
});

const attendanceSchema = new Schema({
  eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
  memberId: { type: Schema.Types.ObjectId, ref: "Member", required: true },
  status: { type: String, enum: ["present", "absent", "RSVP"], required: true },
  timestamp: { type: Date, default: Date.now },
});

const missionaryExperienceSchema = new Schema({
  memberId: { type: Schema.Types.ObjectId, ref: "Member", required: true },
  areaCompanion: { type: [String], default: [] },
  dateOfExperience: { type: Date },
  description: { type: String, required: true },
});

// Indexes for performance optimization
memberSchema.index({ email: 1 });
attendanceSchema.index({ eventId: 1, memberId: 1 });

module.exports = {
  MissionaryExperience: model("MissionaryExperience", missionaryExperienceSchema),
  Event: model("Event", eventSchema),
  Member: model("Member", memberSchema),
  Attendance: model("Attendance", attendanceSchema),
  User: model("User", userSchema),
};
