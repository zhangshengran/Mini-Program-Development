var xml2js = require('xml2js');
var express = require('express');
var app = express();
app.post('/wx/talk', (req, res) => {
    var xml = ''
    var json = null
    req.on('data', (chunk) => {
        xml += chunk;
    })
    req.on('end', () => {
        xml2js.parseString(xml, { explicitArray: false }, function (err, json) {
            console.log(`接收到的数据${xml}`)
            console.log('解析出的对象', json)
            var backTime = new Date().getTime();  //创建返回时间
            if (json.xml.MsgType == 'event') {  //消息为事件类型

                if (json.xml.EventKey == 'clickEvent') {
                    res.send(getXml(json, backTime, '你戳我干啥...'))  //回复用户的消息
                }
                if(json.xml.Event == 'subscribe'){
                    res.send(getXml(json, backTime, '欢迎订阅'))  //回复用户的消息
                    console.log(`用户${json.xml.FromUserName}订阅公众号`)
                }else if(json.xml.Event == `unsubscribe`){
                    res.send(getXml(json, backTime, '取消订阅测试'));
                    console.log(`用户${json.xml.FromUserName}取消订阅`)
                }else if(json.xml.Event == `LOCATION`){
                        var {Latitude,Longitude,Precision} = json.xml;
                        console.log(`经度${Latitude}纬度${Longitude}精度${Precision}`);
                }

            } else if (json.xml.MsgType == 'text') {
                
                res.send(getXml(json, backTime, `你发送的是${json.xml.Content}`))
            } else if (json.xml.MsgType == 'image' || json.xml.MsgType == 'voice') {
                res.send(getXml(json, backTime));
                console.log(`发送的数据`, getXml(json, backTime));
            }else if (json.xml.MsgType == 'video') {//视频接口无法使用
                res.send(getXml(json, backTime));
                console.log(`发送的数据`, getXml(json, backTime));
            }
            else {
                res.send(`success`);
                console.log('无法解析');

            }


        });
    })

    function getXml(json, backTime, word) {
        var { ToUserName, FromUserName, MsgType } = json.xml;
        switch (MsgType) {

            case 'text':
                return `
                    <xml>
                        <ToUserName><![CDATA[${FromUserName}]]></ToUserName>
                        <FromUserName><![CDATA[${ToUserName}]]></FromUserName>
                        <MsgType><![CDATA[text]]></MsgType>
                        <Content><![CDATA[${word}]]></Content>
                        <CreateTime>${backTime}</CreateTime>
                    </xml>
                `;

            case 'image':
                return `
                    <xml>
                        <ToUserName><![CDATA[${FromUserName}]]></ToUserName>
                        <FromUserName><![CDATA[${ToUserName}]]></FromUserName>
                        <MsgType><![CDATA[image]]></MsgType>
                        <CreateTime>${backTime}</CreateTime>
                        <Image>
                        <MediaId><![CDATA[${json.xml.MediaId}]]></MediaId>
                        </Image>
                    </xml>
                `;
            case 'voice':
                return `
                    <xml>
                        <ToUserName><![CDATA[${FromUserName}]]></ToUserName>
                        <FromUserName><![CDATA[${ToUserName}]]></FromUserName>
                        <MsgType><![CDATA[voice]]></MsgType>
                        <CreateTime>${backTime}</CreateTime>                       
                        <Voice>
                        <MediaId><![CDATA[${json.xml.MediaId}]]></MediaId>
                        </Voice>
                    </xml>
                `;
            case 'video':
                return `
                <xml>
                    <ToUserName><![CDATA[${FromUserName}]]></ToUserName>
                    <FromUserName><![CDATA[${ToUserName}]]></FromUserName>
                    <CreateTime>${backTime}</CreateTime>
                    <MsgType><![CDATA[video]]></MsgType>
                    <Video>
                        <MediaId><![CDATA[${json.xml.MediaId}]]></MediaId>
                        <Title><![CDATA[title]]></Title>
                        <Description><![CDATA[description]]></Description>
                    </Video>
                    </xml>
                `
            default:
                return `
                <xml>
                    <ToUserName><![CDATA[${json.xml.FromUserName}]]></ToUserName>
                    <FromUserName><![CDATA[${json.xml.ToUserName}]]></FromUserName>
                    <CreateTime>${backTime}</CreateTime>
                    <MsgType><![CDATA[text]]></MsgType>
                    <Content><![CDATA[${word}]]></Content>
                </xml>
            `
        }


    };

})
app.listen(80)