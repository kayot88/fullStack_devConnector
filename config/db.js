const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
// const db = process.env.MONGODB_URL; //without internet

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.log(`Connection error ${error.message}`);
    //exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
