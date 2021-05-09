/**
 *@description:mongoose连接数据库 
 *
 */

 const mongoose = require('mongoose')

 //  本地数据库的地址
 const url = 'mongodb://localhost:27017'
 const dbName = 'testdb'

//  配置
mongoose.set('useCreateIndex',true)
mongoose.set('useFindAndModify',false)

//  连接数据库
mongoose.connect(`${url}/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

//  监听连接是否成功
db.on('error', err => {
  console.log('mongoose connect error', err)
})

// //  成功打开
// db.once('open', () => {
//     console.log("mongoose 连接成功")
// })

module.exports = mongoose