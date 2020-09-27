const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const ip = require('ip');

const serve_port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

require("fs").readdirSync(require("path").join(__dirname, "routes")).forEach(function(file) {
  app.use('/', require("./routes/" + file));
});

const server = app.listen(serve_port, '0.0.0.0', function () {
  console.log('Server Listening on ' + ip.address() + ':' + serve_port.toString());
});