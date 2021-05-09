/**
 *@description 订单数据操作
 */
const Order = require('../models/Order')
const Address = require('../models/Address')
const Product = require('../models/Product')

!(async () => {
  // 创建订单
  //  前端发送过来的数据
 const requestBody = {
    addressId: '608e34e85ebab2289cdba76d',
    shopId: '608e3a56d38e990b68714eb0',
    shopName: '沃尔玛',
    isCanceled:false,
    products:[
        {
            id:'608e3cea5efcac03bcddbdbe',
            num:3
        },
        {
            id: '608e3cea5efcac03bcddbdbf',
            num: 10
        }
    ]
 }
    // 获取address
    const address =await Address.findById(requestBody.addressId)
    
    //获取商品列变的id
    const pIds = requestBody.products.map(p=>p.id)
    // 获取对应商品的信息
    const porductList = await Product.find({
        shopId:requestBody.shopId,
        _id:{$in: pIds} //保证商品id在这里面
    })

   // 整合订单购买数量  将商品信息和商品数量结合起来
   const porductListWithSales = porductList.map(p => {
    //  找到订单中商品的id
    const id = p._id.toString()
    //找到商品的购买数量
    const filterList = requestBody.products.filter(item=> item.id === id )
    if(filterList.length===0){
        throw Errow("未找到匹配的销量数据")
    }
    return {
        product: p,
        orderSales: filterList[0].num
    }
   })
   await Order.create({
       username: 'zhangsan',
       shopId:requestBody.shopId,
       shopName:requestBody.shopName,
       isCanceled:requestBody.isCanceled,
       address,
       products:porductListWithSales  //主要是这里最难的
   })

} )()