
const mongoose = require("mongoose");
// const mongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv")
dotenv.config();


let database;
// the variable that holds the database.

// This function initialise a mongodb databse connection
const initDb = (callback) => {
  // it takse a function as a callback, that decides what to do after
  // the initialization

  if (database) {
    // check if the database has already been initialised
    return callback(null, database);
    // then the function returns the database with a null as the error argument
  }
  mongoose.connect(process.env.MONGO_URL)
    .then((client) => {
      client = database;
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};

// Get the database

const getDatabase = () => {
  if (!database) {
    throw Error("Database is not initialised");
  }

  return database;
};

module.exports = {
  getDatabase,
  initDb,
};
