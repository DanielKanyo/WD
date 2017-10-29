const express = require('express');
const router = express.Router();
const Diary = require('../models/diary');

// GET data from db
router.get('/diary', (req, res, next) => {
  res.send({ type: 'GET' });
});

// ADD NEW data to the db
//next piece of middleware will be the error handling
router.post('/diary', (req, res, next) => {
  Diary.create(req.body).then((diary) => {
    res.send(diary);
  }).catch(next); 
});

// UPDATE data in the db
router.put('/diary/:id', (req, res, next) => {
  res.send({ type: 'PUT' });
});

// DELETE data from the db
router.delete('/diary/:id', (req, res, next) => {
  Diary.findByIdAndRemove({_id:  req.params.id}).then( (diary) => {
    res.send(diary);
  });
});

module.exports = router;