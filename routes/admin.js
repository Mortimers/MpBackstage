var express = require('express');
var router = express.Router();
let Kitten = require('../mongodb/model');

/* GET users listing. */
router.post('/', function(req, res, next) {
  
  new Kitten({
    name: 'Jim',
    age: 28
  }).save((err) => {
    if(err) return res.status(500).send('server err')
    res.redirect('/')
  })

});

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
  // let kit = new Kitten({
  //   name: 'Kit',
  //   age: 28
  // })

  // kit.save((err) => {
  //   if (err) throw err
  //   res.redirect('/')
  // })
})

module.exports = router;
