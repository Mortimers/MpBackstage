var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var Cookies = require('cookies');
var logger = require('morgan');

var h5Router = require('./routes/h5');  // 前端请求
var adminRouter = require('./routes/admin');  // 管理后台请求
var uploadRouter = require('./routes/upload');  //  上传文件

var mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://139.155.28.31:27017/my',{ 
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

mongoose.connection.on('open', () => {
  console.log('数据库连接成功');
})
mongoose.connection.on('error', () => {
  console.log('数据库连接失败');
})

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 设置cookie
app.use(function(req, res, next) {
  req.cookies = new Cookies(req, res)
  // 加这段是为了给请求的加一个userInfo字段
  req.userInfo = {};
  if(req.cookies.get('userInfo')) {
    try {
      req.userInfo = JSON.parse(req.cookies.get('userInfo'))
    }catch(e) {

    }
  }

  next();
})

// 路由跳转
app.use('/h5', h5Router);
app.use('/admin', adminRouter);
app.use('/upload', uploadRouter);

app.get('/', (req, res) => {
  res.send('hello world')
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
