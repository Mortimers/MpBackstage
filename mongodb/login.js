const mongoose = require('mongoose')

// 定义表结构
let Schema = mongoose.Schema

// 涉及表结构
let login = new Schema({
  username: String,
  password: String
})

module.exports = mongoose.model('logininfo', login)