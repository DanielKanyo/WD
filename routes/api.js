const express = require('express');
const router = express.Router();

// get data from db
router.get('/data', function (req, res) {
  res.send({ type: 'GET' });
});

// add new data to the db
router.post('/data', function (req, res) {
  console.log(req.body);
  res.send({ type: 'POST' });
});

// update data in the db
router.put('/data/:id', function (req, res) {
  res.send({ type: 'PUT' });
});

// delete data from the db
router.delete('/data/:id', function (req, res) {
  res.send({ type: 'DELETE' });
});

module.exports = router;