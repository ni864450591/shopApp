const router = require('koa-router')()
const { register, login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../res-model/index')

//  公共前缀
router.prefix('/api/user')

//  注册：创建一个新的用户
router.post('/register', async function(ctx, next) {
  //  这里就拿到了前端发送过来的用户名和密码
  const { username, password } = ctx.request.body  
  try {
    //  进行注册，看得到的返回结果
    const res =await register(username, password)
    ctx.body =  new SuccessModel(res)
  } catch(ex) {
      console.log(ex)
      ctx.ErrorModel = new ErrorModel(10001, `注册失败--${ex.message}`)
  }
})

// 登录： 进行登录校验，登录完把username放于session.userInfo 中
router.post('/login', async (ctx, next) => {
  //  拿到前端发送过来的用户名和密码
  const { username , password } = ctx.request.body
  const res = await login(username, password)
  if (res) {
    //  成功得把用户信息放在session中，用于登录校验中间件的校验标准
    ctx.session.userInfo =  { username }
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel(10002, '登录验证失败')
  }
})

module.exports = router
