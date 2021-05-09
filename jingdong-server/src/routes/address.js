/**
 * @description address router
 */
const router = require('koa-router')()
const { SuccessModel, ErrorModel } = require('../res-model/index')
const loginCheck =require('../middleware/loginCheck') 
const { createAddress, getAddressList, getAddressById, updateAddress } = require('../controller/address')

router.prefix('/api/user/address')


//  创建收货地址
router.post('/', loginCheck, async (ctx, next) => {
  const data = ctx.request.body
  const username = ctx.session.userInfo.username
  try{
    const newAddress =await createAddress(username, data)
    ctx.body = new SuccessModel(newAddress)
    } catch(ex) {
    console.log(ex)
    ctx.body = new ErrorModel(10004,`创建地址失败+${ex.message}`)
 }
})

 //  获取收货地址列表
 router.get('/', loginCheck, async (ctx, next) => {
   const username = ctx.session.userInfo.username
   try{
     const addressList = await getAddressList(username)
     ctx.body =new SuccessModel(addressList)
   } catch(ex) {
    console.log(ex)
    ctx.body = new ErrorModel(10005,`获取地址列表失败+${ex.message}`)
   }
 })

 //  获取单个收货地址
router.get('/:id', loginCheck, async (ctx, next) => {
  const id = ctx.params.id
  try{
    const address = await getAddressById(id)
    ctx.body = new SuccessModel(address)
  } catch(ex) {
    console.log(ex)
    ctx.body = new ErrorModel(10006,`获取单个地址失败+${ex.message}`)
  }
})

 //  更新收货地址
router.patch('/:id', loginCheck, async(ctx, next) => {
  const data = ctx.request.body
  const id = ctx.params.id
  const username = ctx.session.userInfo.username
  try{
    const newAddress = await updateAddress(data, id, username)
    ctx.body = new SuccessModel(newAddress)
  } catch(ex) {
    console.log(ex)
    ctx.body = new ErrorModel(10007,`更新地址失败+${ex.message}`)
  }
})




module.exports = router
