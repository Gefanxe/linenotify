const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('index',
    {
      title: '首頁'
    }
  );
});

module.exports = router;


/* 範例
app.get('/', function (req, res) {
  res.render('default',
    {
      title: '首頁'
    }
  );
});

app.post('/', function (req, res) {
  console.dir(req.body);
  res.send('OK');
});

app.get('/me', function (req, res) {
  res.send('<h1>我的FB</h1>' + 'https://www.facebook.com/witkaiy');
});

app.get('/who/:name?', function (req, res) {
  var name = req.params.name;
  res.send(name + ' 在這邊歐');
});

app.get('/who/:name?/:title?', function (req, res) {
  var name = req.params.name;
  var title = req.params.title;
  res.send('<p>名稱: ' + name + '<br>值稱: ' + title + '</p>');
});

app.get('*', function (req, res) {
  res.send('沒有東西噢');
});
*/