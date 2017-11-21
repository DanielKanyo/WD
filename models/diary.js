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
    required: [false]
  },
  productOwner: {
    type: String,
    required: [false]
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
  date: {
    type: String,
    required: [true, 'Date is required']
  },
  entryType: {
    type: String,
    required: [true, 'Entry type is required']
  }
});

const Diary = mongoose.model('diary', DiarySchema);

module.exports = Diary;