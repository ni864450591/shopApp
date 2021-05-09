/**
 * @description:登录验证中间件
 */
 const { ErrorModel } = require('../res-model/index')

//  判断session中里面是否有用户的信息
module.exports = async (ctx, next) => {
  const session = ctx.session
  if (session && session.userInfo) {
    await next()
    return
  }
  ctx.body = new ErrorModel(10003, '登录验证失败')
}