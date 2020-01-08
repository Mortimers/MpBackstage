let express = require('express');
let router = express.Router();
let Kitten = require('../mongodb/model');
let loginInfo = require('../mongodb/login');

let formidable = require('formidable');
let fs = require('fs');
let path = require('path');

// 默认response
let resObj = {
  code: 20000,
  message: 'success',
  data: {}
}


/** 上传文件、图片*/
router.post('/toLocal', (req, res) => {
  console.log('--upload---')
  let form = new formidable.IncomingForm()
  form.parse(req, (error, fields, files) => {
    console.log('path',files.upload)
    fs.writeFileSync('public/test.png', fs.readFileSync(files.path));

  })
})



/* GET users listing. */
// 登录
router.post('/login', (req, res) => {
  console.log('---222---')
  let username = req.body.username
  let password = req.body.password

  if(!username || !password) {
    resObj.code = 10000
    resObj.message = '账号或密码不能为空'
    res.json(resObj)
    return
  }

  // 查询数据库
  loginInfo.findOne({
    username: username,
    password: password
  }).then(userInfo => {
    // 校验密码, 20000成功，10000登录失败
    console.log(userInfo)
    if(userInfo) {
      resObj.code = 20000
      resObj.message = '登录成功'

      req.cookies.set('userInfo', JSON.stringify({
        _id: userInfo._id,
        username: userInfo.username
      }))

      res.json(resObj)
      return
    } else {
      resObj.code = 10000
      resObj.message = '账号或密码错误'
      res.json(resObj)
      return
    }
  })
});

/* 添加文章 */
router.post('/addArticle', (req, res) => {
  let obj = req.body;

})

router.get('/add', (req, res, next) => {
  // 保存到数据库
  Kitten.create({
    name: 'Jim',
    age: 23
  }, function (err, data) {
    if (err) throw err;
    console.log('注册成功');
    res.redirect('/');      // 重定向到所用用户列表
  })
})

module.exports = router;
