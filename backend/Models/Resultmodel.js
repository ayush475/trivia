const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  participant: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  totalTime: {
    type: Number,
    required: true
  }
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
