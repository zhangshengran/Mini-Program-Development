const awyhttp = require('awyhttp');
const fs = require('fs');
const get = require('./getToken');


var thumb_media_id = 'TVWrta-NNjRhQFXVYggyHNgZH1tmcGx_EyvDS9CD_m4';

var my_news = {
    articles : [
        {
            title : '我是个程序员',
            thumb_media_id : thumb_media_id,
            show_cover_pic : 1,
            content : '我是个程序员，为了成为编程大师，我每天都不停的编码，现在每天都很累，这种生活已经持续了很长时间，我想起大学快乐的时光，那是我逝去的青春。',
            content_source_url : ''

        }
    ]
};

get()

.then(token => {

    var add_news = `https://api.weixin.qq.com/cgi-bin/material/add_news?access_token=${token}`;

    return awyhttp.post(add_news, {
        headers : {
            'Content-Type' : 'text/plain'
        },
        data : my_news
    });

}, err => {
    throw err;
}).then((data)=>{
    console.log(data);
})