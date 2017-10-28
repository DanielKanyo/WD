const express = require('express');
const router = express.Router();
const Diary = require('../models/diary');

// get data from db
router.get('/diary', function (req, res) {
  res.send({ type: 'GET' });
});

// add new data to the db
router.post('/diary', function (req, res) {
  // var diary = new Diary(req.body);
  // diary.save();
  Diary.create(req.body).then(function(diary) {
    res.send(diary);
  }); 
});

// update data in the db
router.put('/diary/:id', function (req, res) {
  res.send({ type: 'PUT' });
});

// delete data from the db
router.delete('/diary/:id', function (req, res) {
  res.send({ type: 'DELETE' });
});

module.exports = router;