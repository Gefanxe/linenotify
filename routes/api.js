const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/api', function(req, res) {
  res.send('/api');
});

router.get('/api/1', function(req, res) {
  res.send('/api/1');
});

module.exports = router;
