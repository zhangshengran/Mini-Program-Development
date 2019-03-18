let axios =require('axios');
let http=require('https');
let bodyParser = require('body-parser');    
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
let appid = 'wx4ac626f3d147898e';
let appsecret = 'befe9cf73fe7109020d1d9e2e4ca42be';

let url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${appsecret}`;

// 调用axios库
// axios.get(token).then(({data:{access_token}})=>{
    
//     console.log(access_token);
// })
var menu_data = {
    button : [
        {
            name : "测试",
            sub_button : [
                {
                    name : "Linux",
                    type : "view",
                    url  : "https://www.linux.org/"
                },
                {
                    name : "NodeDoc",
                    type : "view",
                    url  : "https://nodejs.org/dist/latest-v10.x/docs/api/"
                },
                {
                    name : "awy",
                    type : "view",
                    url  : "https://awy.linuslinux.com"
                },

            ]
        },
        {
            name : "测试发图",
            type : "pic_weixin",
            key  : "my-image"
        },
        {
            name : "功能",
            sub_button : [
                {
                    name : "关于我们",
                    type : "click",
                    key  : "about-us"
                },

            ]
        }
        
    ]
};
function getNow(){
    return new Date().getTime()/1000;
}

function  scrollFn(){
    let now = getNow();
    let token;  
  return function(callback){
    
    let now2 = getNow();

    console.log(`时间差`,now2-now)
        if( !token || now2-now>7200 )
    {
        axios.get(url).then(({data:{access_token}})=>{
            token = access_token;
            now = now2;
            console.log('，token已过期，重新验证拿到的token',token)
            callback(token);

        })
    }else{
        console.log('，token未过期，未重新验证',token)
        callback(token);
    }
  }
}


let x = scrollFn();
x((token)=>{

    console.log('回调函数拿到的token'+token)
    var json_menu = JSON.stringify(menu_data);

    var create_menu_api = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${token}`;
    axios.post(create_menu_api,json_menu,{headers:{'Content-Type':'text/plain'}}).then(({data})=>{
        console.log(json_menu);
        console.log(data);
    })
})



