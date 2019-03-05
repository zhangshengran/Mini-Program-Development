
const express = require('express');
const crypto = require('crypto');

var app = express();
app.get('/wx/talk', (req, res) => {
    var { signature, echostr, timestamp, nonce } = req.query;
    var token = 'xingyun2016'  //输入自己的token
    var arr = [];
    arr.push(token, timestamp, nonce)
    arr.sort()  //进行字典排序
    console.log('字典排序' + signature)
    var str = arr.join('');//拼接字符串

    var hash = crypto.createHash('sha1');
    var sha1 = hash.update(str,'utf-8').digest("hex");


    console.log('加密sha1' + sha1)
    if (sha1 == signature) {
        console.log('1')
        res.send(echostr);
    }

})

app.listen(80);




