const mongoose = require('mongoose');
dotenv = require('dotenv').config();


const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MongoDB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    //   useFindAndModify: false,
    });
    console.log('Connected to MongoDB successfully!');
  } catch (error) {
    console.error('Failed to connect to MongoDB :', error.message);
    process.exit(1); // Terminate the application if unable to connect
  }
};

module.exports = connectToDatabase;
