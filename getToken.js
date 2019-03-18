let axios =require('axios');
let fs = require('fs');

let key = require('./key.js');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

let url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${key.appid}&secret=${key.appsecret}`;




 function getToken(){
    // var {data:{access_token}} = await axios.get(url);
    // console.log(access_token);
    return new Promise((res,rej)=>{
        fs.readFile('tmp/token.txt','utf8',(err,data)=>{
            let x = JSON.parse(data);
            var now2 = new Date().getTime()/1000;
            let timeout = now2-x.now;
            if(err || timeout>7200 ){
                    axios.get(url).then(({data:{access_token}})=>{
                        var now = new Date().getTime()/1000;
                        var d = JSON.stringify({access_token:access_token,now:now})
                    fs.writeFile('tmp/token.txt',d,(err)=>{
                        if(err){
                            rej(err);
                        }else{
                            console.log({access_token,now})
                            console.log('222')
                            res(access_token)
                        }
                       
                    })
                    });
                   
            }else{
                res(x.access_token);
                console.log(x.access_token)
            }
        })
    })
}
module.exports =getToken;