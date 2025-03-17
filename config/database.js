const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

let database; // Holds the database connection

// Function to initialize MongoDB connection
const initDb = async (callback) => {
	if (database) {
		console.log("✅ Database already initialized.");
		return callback(null, database);
	}
 
	try {
		const connection = await mongoose.connect(process.env.MONGO_URL);

		database = connection.connection; // Assign the database connection
		console.log("🚀 MongoDB connected successfully!");
		callback(null, database);
	} catch (error) {
		console.error("❌ MongoDB connection error:", error);
		callback(error);
	}
};

// Function to get the database connection
const getDatabase = () => {
	if (!database) {
		throw new Error("Database is not initialized. Call initDb() first.");
	}
	return database;
};

module.exports = {
	getDatabase,
	initDb,
};
