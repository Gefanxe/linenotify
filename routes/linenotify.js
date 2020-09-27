const express = require('express');
const axios = require('axios');
const ip = require('ip');
const FormData = require('form-data');
const router = express.Router();

// TODO: LINE data set to db
const client_id = 'Gf1nOjPTGZ5bdBT0IyO5QJ';
const client_secret = 'xl9HcD1FQKyKCqs1U3EK6ggBRLS87qPh4EvUu0t3cmn';
const redirect_uri = 'http://localhost:3000/line/callback';

function getAccessToken(code, cb) {
    let formdata = new FormData();

    formdata.append('grant_type', 'authorization_code');
    formdata.append('redirect_uri', redirect_uri);
    formdata.append('client_id', client_id);
    formdata.append('client_secret', client_secret);
    formdata.append('code', code);

    axios.post('https://notify-bot.line.me/oauth/token', formdata, {
        headers: {
            ...formdata.getHeaders()
        }
    }).then(function (response) {
        // console.log('getAccessToken result:', response);
        cb(response);
    }).catch(function (error) {
        // console.log('getAccessToken error:', error);
        cb(error);
    });
}

function sendMsg(token, msg, cb) {
    let formdata = new FormData();
    let message = "\n" + msg.replace('|', '\n');
    formdata.append('message', message);

    axios.post('https://notify-api.line.me/api/notify', formdata, {
        headers: {
            'Authorization': `Bearer ${token}`,
            ...formdata.getHeaders()
        }
    }).then(function (response) {
        // console.log('line notify result:', response);
        cb(response);
    }).catch(function (error) {
        console.log('line notify error:', error);
        cb(error);
    });
};

router.post('/line/callback', function (req, res) {
    // console.dir(req.body);
    const code = req.body.code;
    getAccessToken(code, function (response) {
        if (response.status === 200) {
            // console.log('ok: ' + response.data.access_token);
            res.send('ok: ' + response.data.access_token);
        } else {
            // console.log(response);
            res.send('fail... ');
        }
    });
});

router.get('/line/regist', function (req, res) {
    res.render('lineregist', {
        title: '首頁',
        client_id: client_id,
        ipport: ip.address() + ':3000',
        redirect_uri: redirect_uri
    });
});

router.post('/line/sendmsg', function (req, res) {
    // console.dir(req.body);
    const token = req.body.token;
    const msg = req.body.msg;
    sendMsg(token, msg, function(response) {
        // TODO: fix
        res.json();
    });
});

module.exports = router;
