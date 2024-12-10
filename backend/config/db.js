// config/db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  const DB_HOST = process.env.DB_HOST;
  const MONGO_URL = process.env.MONGO_URL;
    
  try {
    if (DB_HOST !== undefined && DB_HOST !== null && DB_HOST !== "")
        await mongoose.connect(process.env.DB_HOST);
    else
        await mongoose.connect(process.env.MONGO_URL);

    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;

