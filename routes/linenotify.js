const express = require('express');
const router = express.Router();




function getAccessToken(code, cb) {
    let formdata = new FormData();

    formdata.append('grant_type', 'authorization_code');
    formdata.append('redirect_uri', 'http://' + ip.address() + ':' + serve_port + '/line/callback');
    formdata.append('client_id', 'mkSexYl4zhWBdB7KFcKY9o');
    formdata.append('client_secret', 'XMgX1cRS4tLRwoFqUQxbmVfloNUciui0c4ufkv0zQaG');
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

// TODO: redirect_uri 要改
router.get('/line/regist', function (req, res) {
    res.render('lineregist', {
        title: '首頁',
        ipport: ip.address() + ':8999',
        redirect_uri: 'http://' + ip.address() + ':' + serve_port + '/line/callback'
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
