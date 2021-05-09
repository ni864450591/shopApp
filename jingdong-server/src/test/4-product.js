/**
 * @description 商品数据操作
 */

const Product = require('../models/Product')

!(async () => {
  //  创建商品
//   await Product.create({
//       shopId: '608e3a56d38e990b68714eb0', //沃尔玛
//       name: '葡萄',
//       imgUrl: '/images/poduct/grape.jpg',
//       sales: 100,
//       price: 33,
//       oldPrice: 36,
//       tabs:['all','seckill','fruit']
//   })
//   await Product.create({
//     shopId: '608e3a56d38e990b68714eb0', //沃尔玛
//     name: '苹果',
//     imgUrl: '/images/poduct/apple.jpg',
//     sales: 200,
//     price: 25,
//     oldPrice: 37,
//     tabs:['all','seckill','fruit']
// })
// await Product.create({
//     shopId: '608e3a56d38e990b68714eb0', //沃尔玛
//     name: '西瓜',
//     imgUrl: '/images/poduct/watermelon.jpeg',
//     sales: 180,
//     price: 13,
//     oldPrice: 15,
//     tabs:['all','seckill','fruit']
// })
// await Product.create({
//     shopId: '608e3a56d38e990b68714eb1', //山姆
//     name: '西瓜',
//     imgUrl: '/images/poduct/watermelon.jpeg',
//     sales: 300,
//     price: 10,
//     oldPrice: 20,
//     tabs:['all','seckill','fruit']
// })
//  查询商品列表 需要商店id和tab
 const productlist = await Product.find({
     shopId: '608e3a56d38e990b68714eb1',
     tabs:{ $in: 'all' } //全部商品 
 }).sort({_id:-1})
 console.log(productlist)
})()