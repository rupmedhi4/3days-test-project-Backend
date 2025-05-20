import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); 

const mongo_url = process.env.MONGO_URL;

const db = async () => {
  try {
    await mongoose.connect(mongo_url);
    console.log('Connected to DB');
  } catch (error) {
    console.error(' Error connecting to DB:', error);
  }
};

export { db };
