/**
 * @description shop router
 */
 const router = require('koa-router')()
 const { SuccessModel, ErrorModel } = require('../res-model/index')
 const { getshopList, getShopInfo, getPorductsByShopId } = require('../controller/shop')

 //  公共前缀
 router.prefix('/api/shop')

 //  获取附近店铺列表
router.get('/hot-list', async (ctx, next) => {
  try{
    const shopList = await getshopList()
    ctx.body = new SuccessModel(shopList)
  } catch(ex) {
      console.log(ex)
      ctx.body = new ErrorModel(10008,`获取商铺列表失败+${ex.message}`)
  }
})

 //  获取单个店铺信息
router.get('/:id', async (ctx, next) => {
  const id = ctx.params.id
  try{
      const shop = await getShopInfo(id)
      ctx.body = new SuccessModel(shop)
    } catch(ex) {
        console.log(ex)
        ctx.body = new ErrorModel(10009,`获取单个商铺信息失败+${ex.message}`)
    }
})

 //  查询某个商店的商品列表
router.get('/:id/products', async (ctx, next) => {
    const id = ctx.params.id
    const tab = ctx.query.tab || 'all'
    try{
      const productList =await getPorductsByShopId(id, tab)
      ctx.body = new SuccessModel(productList)
    } catch(ex) {
        console.log(ex)
        ctx.body = new  ErrorModel(10010,`获取商品信息失败+${ex.message}`)
    }
})


 module.exports = router