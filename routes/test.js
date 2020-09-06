const express = require('express');
const router = express.Router();

/* GET users listing. */
router.post('/test', function(req, res) {

  
  res.send('respond with a resource');
});

module.exports = router;
