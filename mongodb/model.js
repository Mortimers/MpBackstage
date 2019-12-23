let mongoose = require('mongoose')

// 连接数据库，在启动时已经连接

// 定义数据库表结构schema
let Schema = mongoose.Schema

// 设计表结构，相当于构建构造函数

let userSchema = new Schema({
  name:{
    type:String
  },
  age:{
      type:Number
  }
})

// 将文档结构发布为模型并导出
module.exports = mongoose.model('Kitten', userSchema)