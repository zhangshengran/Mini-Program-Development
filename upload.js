var scrollFn = require('./05闭包解决重复验证问题');

let x = scrollFn;
x((token)=>{

    console.log('回调函数拿到的token'+token)
    var json_menu = JSON.stringify(menu_data);

    var create_menu_api = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${token}`;
    axios.post(create_menu_api,json_menu,{headers:{'Content-Type':'text/plain'}}).then(({data})=>{
        console.log(json_menu);
        console.log(data);
    })
})

// console.log(scrollFn)