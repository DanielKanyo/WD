const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create diary Schema and model
const DiarySchema = new Schema({
  startTime: {
    type: String,
    required: [true, 'Start time is required']
  },
  project: {
    type: String,
    required: [true, 'Project name is required']
  },
  productOwner: {
    type: String,
    required: [true, 'Product owner is required']
  },
  taskNumber: {
    type: Number,
    required: [false]
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  endTime: {
    type: String,
    required: [true, 'End time is required']
  },
});

const Diary = mongoose.model('diary', DiarySchema);

module.exports = Diary;