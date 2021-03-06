/**
 * @description User Model
 */
const mongoose = require('../db/db')

const Schema = mongoose.Schema({
  username: {
    type: String,
    require: true, //必须
    unique: true  //不可重复
  },
  password: {
      type: String,
      require: true
  }
}, {
    timestamps: true //时间戳
})
const User = mongoose.model('user', Schema)

module.exports = User