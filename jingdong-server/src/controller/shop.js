/**
 * @description shop controller
 */
const Shop = require('../models/Shop')
const Product = require('../models/Product')

/**
 * 获取附近店铺信息
 */
async function getshopList() {
  const shopList = Shop.find().sort({ _id: -1 })
  return shopList
}

/**
 * 根据id获取单个商铺id
 * @param {String} id  商品id
 */
async function getShopInfo(id) {
    const shop = Shop.findById(id)
    return shop
  }

/**
 * 获取商品信息
 * @param {String} shopId 商铺Id
 * @param {String} tab  tab分类
 */
  async function getPorductsByShopId(shopId, tab = 'all') {
    const productList = await Product.find({
        shopId,
        tabs: { $in: tab } 
    }).sort({_id:-1})
    return productList
  }

module.exports = {
  getshopList,  getShopInfo, getPorductsByShopId
}