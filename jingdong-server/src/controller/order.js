/**
 * @description order controller
 */
const Address = require('../models/Address')
const Order = require('../models/Order')
const Product = require('../models/Product')
/**
 * 创建订单
 * @param {String} username 用户名
 * @param {String} data 数据
 */
//  这是这里最难的part,这里是要把数据拼接成model里要求的数据格式
//  address:地址根据地址id获取即可 //拷贝一份，不是引用
//  usernmae,shopName,isCanceled shopId
//  products:[{ porduct:{ } orderSales: 10 }]
//  这里要将产品基本信息和销售数量拼接起来 组成products
//  1、获取products里的所有商品id组成的数组
//  2、根据id去数据库查找对应商品组成的数组
//  3、然后就是去遍历第2步找到的数组，过滤掉那些不匹配的商品，然后去到他们的num作为orderSales
async function createOrder(username, data) {
  const { addressId, shopId, shopName, isCanceled = false, products = [] } = data
  // 根据addressId 获取地址信息
  const address = await Address.findById(addressId)
  const pIds = products.map(p => p._id) //获取每个商品的id组成数组
  const productList = await Product.find({ shopId, _id: { $in: pIds} })
  //  拼接上购买数量
  const productListWidthSales = productList.map(p => {
      const id = p._id.toString()
      // 通过商品id可以找到销售数量
      const filterProducts =products.filter(item => item._id === id) 
      if (filterProducts.length === 0) {
          throw new Error('未找到匹配的销售数量')
      }
      return {
          product: p,
          orderSales: filterProducts[0].num
      }
  })
  // 创建订单
  const newOrder = await Order.create({
      username, shopId, shopName, address, isCanceled, products: productListWidthSales
  })
  return newOrder
}

/**
 * 获取订单信息
 * @param {String} username 用户名
 */
async function getOrderList(username) {
  const orderList = await Order.find({ username }).sort({ _id: -1})
  return orderList
}

module.exports = {
    createOrder, getOrderList
}