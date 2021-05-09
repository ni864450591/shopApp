/**
 * @description 地址数据操作
 */

const { updateOne } = require('../models/Address')
const Address = require('../models/Address')

!(async () => {
//   // 创建收货地址
//   await Address.create({
//       username: 'zhangsan',
//       city: '北京',
//       department: '**小区',
//       housenumber: '303',
//       name: '张三',
//       phone: '12131311231'
//   })
//    // 再创建收货地址
//    await Address.create({
//     username: 'zhangsan',
//     city: '上海',
//     department: 'yy小区',
//     housenumber: '303',
//     name: '张三',
//     phone: '12198888'
// })

    //  获取收货地址列表 根据username
    // const address = await Address.find({username: 'zhangsan'}).sort({updatedAt: -1})
    // console.log(address)


    //  根据id获取单个地址
    // const address = await Address.find({_id:'608e35791ace6907fc1999db' })
    // console.log(address)

    // 更新收货地址
    const id='608e35791ace6907fc1999db'
    const newData = {
      username:'zhangsan',
      city: '北京市',
      department: 'yy小区A',
      housenumber: '303A',
      name: '张三',
      phone: '12123128888'
    }
    const address = await Address.findOneAndUpdate({
        _id:id, 
        username:'zhangsan'
    }, newData, {
        new: true  //返回更新之后的最新数据(默认是false),false表示更新前的数据
    })
    console.log(address)

})()