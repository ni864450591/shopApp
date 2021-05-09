/**
 * @description order router
 */
 const router = require('koa-router')()
 const { SuccessModel, ErrorModel } = require('../res-model/index')
 const loginCheck =require('../middleware/loginCheck')
 const { createOrder, getOrderList } = require('../controller/order')

 router.prefix('/api/order')

 // 创建订单
router.post('/', loginCheck, async (ctx, next) => {
  const username = ctx.session.userInfo.username
  const data = ctx.request.body
  try {
    const newOrder = await createOrder(username, data)
    ctx.body = new SuccessModel(newOrder)
  } catch(ex) {
    console.log(ex)
    ctx.body = new ErrorModel(10011,`创建订单失败+${ex.message}`)
  }
})

 // 获取订单(根据用户名查找)
router.get('/', loginCheck, async (ctx, next) => {
    //  取到session的用户名
    const username = ctx.session.userInfo.username
    try {
      const orderList = await getOrderList(username)
      ctx.body = new SuccessModel(orderList)
    } catch(ex) {
        console.log(ex)
        ctx.body = new ErrorModel(10012,`获取订单信息失败+${ex.message}`)
    }
})

 module.exports = router