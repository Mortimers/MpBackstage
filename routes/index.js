var express = require('express');
var router = express.Router();
const request = require('request')

const APP_URL='https://api.weixin.qq.com/sns/jscode2session';
const APP_ID = 'wx874ac2edac01da5f';
const APP_SECRET = 'efa30c78e41a985df72f7657ceeae473';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/wx', (requests, responses, next) => {
  const code = requests.query.code //拿到传过来的code
  //调用 auth.code2Session接口，换取用户唯一标识 OpenID 和 会话密钥 session_key
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${APP_ID}&secret=${APP_SECRET}&js_code=${code}&grant_type=authorization_code`;

  request(url, (err,res,body)=>{
    responses.send(body)  //将请求到的 OpenID与 session_key 返回给小程序页面js文件
  })
});

module.exports = router;
