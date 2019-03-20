var getToken = require('./getToken');
var fs = require('fs');
const awyhttp = require('awyhttp');
var get = getToken()

// var image_name = '26033802.jpg';
// var image_path = './' + image_name;
// 文件上传.
//image_path：图片路径
function upload(image_path){
get.then((token)=>{
    var upload_api = `https://api.weixin.qq.com/cgi-bin/material/add_material?access_token=${token}&type=image`;

    /** 
     * awyhttp上传文件接受两个参数，第一个是请求URL，
     * 第二个是选项，对于上传文件来说，默认就是POST请求，
     * 需要设置file表示文件的路径，upload_name表示上传文件name属性名。
    */
    return awyhttp.upload(upload_api, {
        file : image_path,
        upload_name : 'media'
    });

})
.then(({data})=>{console.log(data)})

}

// upload('./images/26033802.jpg')

// 文件下载
//media_id微信服务器上的图片id，target下载的目标位置 例target : './test222.jpg'
function download(media_id,target){
/**
 * 下载涉及到的请求不仅仅是GET，对于微信公众号接口，获取素材是POST请求。
 * data表示POST提交的数据，data字段会自动进行JSON.stringify处理。
 * headers设置Content-Type是表示POST提交的数据不作为表单数据解析，
 * 直接就获取Body部分的数据，也就是data字段的数据。
 * target是要下载的文件路径。
 * download接口内部会使用target自动创建可写流，把获取的数据和可写流对接，
 * 完成后或出错会返回Promise对象，通过then方法接受执行结果。
 */
get.then((token)=>{
    var download_media = `https://api.weixin.qq.com/cgi-bin/material/get_material?access_token=${token}`;

    return awyhttp.download(download_media, {
        method : 'POST',
        data : {
            //换成你自己的素材MEDIA_ID
            media_id : media_id
        },
        headers : {
            'Content-Type' : 'text/plain'
        },
        target : target
    });
})
}
download('TVWrta-NNjRhQFXVYggyHNgZH1tmcGx_EyvDS9CD_m4','images/从服务器下载.jpg')


// get.then(token => {
//     //获取素材总数
//     var get_media_total = `https://api.weixin.qq.com/cgi-bin/material/get_materialcount?access_token=${token}`;

//     return awyhttp.get(get_media_total)
//             .then(data => {
//                 var ret = JSON.parse(data);
//                 if (ret.errcode !== undefined) {
//                     throw data;
//                 }
//                 return ret;
//             }, err => {
//                 throw err;
//             });

// })










// get.then((token)=>{
//     var upload_api = `https://api.weixin.qq.com/cgi-bin/material/add_material?access_token=${token}&type=image`;
//     fs.readFile('./26033802.jpg',(err,data)=>{
//                 fd.append('file', data);
//                 console.log(fd.get("file"))  // "v1"
//                 // fd.append('media', 'test');
//                 axios.defaults.withCredentials = true;
                
//         axios.post(upload_api,data).then(({data})=>{
//                 console.log(data);
//         })
//     })
    
// })

