var xml2js=require('xml2js');
var express = require('express');
var app = express();
app.post('/wx/talk',(req, res)=>{
    var xml = ''
    var json = null
    req.on('data',(chunk)=>{
        xml += chunk;
    })
    req.on('end',()=>{
        xml2js.parseString(xml,  {explicitArray : false}, function(err, json) {  
                console.log('解析出的对象',json)
            var backTime = new Date().getTime();  
            if( json.xml.MsgType == 'event' ){  //消息为事件类型

                if( json.xml.EventKey == 'clickEvent' ){
                    res.send( getXml( json , backTime , '你戳我干啥...' ) )  //回复用户的消息
                }
            }else if( json.xml.MsgType == 'text' ){ 

                res.send( getXml( json , backTime , `${json.xml.Content}` ) )  
            }else{
                res.send( `无法解析`)
            }


        }); 
    })

    function getXml( json , backTime , word ){
        var backXML = `
                <xml>
                    <ToUserName><![CDATA[${json.xml.FromUserName}]]></ToUserName>
                    <FromUserName><![CDATA[${json.xml.ToUserName}]]></FromUserName>
                    <CreateTime>${backTime}</CreateTime>
                    <MsgType><![CDATA[text]]></MsgType>
                    <Content><![CDATA[${word}]]></Content>
                </xml>
            `
        return backXML;
    };

})
app.listen(80)