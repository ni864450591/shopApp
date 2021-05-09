/**
 * @description user controller
 */
//  引入model
const User = require('../models/User')

/**
 * 注册
 * @param {String} username  用户名
 * @param {String} password  密码
 
 */
async function register(username, password) {
    //  保存到数据库
    //  创建新用户，返回一个新用户的信息
    const newUser = await User.create({username, password})
    return newUser
}

/**
 * 登录
 * @param {String} username  用户名
 * @param {String} password   密码
 */
async function login(username, password) {
  //  根据用户名和密码查找
  const user=await User.findOne({
      username,password
  })
  if (user !== null) { return true } //登录成功
  return false  //登录失败
}


module.exports = {
    register, login
}
