const awyhttp = require('awyhttp');
const get = require('./getToken');

var media_id = 'TVWrta-NNjRhQFXVYggyHNfGGfL8XpbOXGl7-r-ZVW0';

get()
// .then((token)=>{
//     console.log(token)
// })
.then(token => {
 
    var get_news_api = `https://api.weixin.qq.com/cgi-bin/material/get_material?access_token=${token}`;

    return awyhttp.post(get_news_api,{
        headers : {
            'Content-Type' : 'text/plain'
        },
        data : {
            media_id : media_id
        }
    });


}, err => {
    throw err;
})
.then((data)=>{
    console.log(JSON.parse(data));
})