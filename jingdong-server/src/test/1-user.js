/**
 * @description 用户数据操作
 */

const User = require('../models/User')

!(async () => {
  // 注册：创建一个新的用户
//   await User.create({
//     username: 'zhangsan',
//     password: '123'
//   })

//   //  再注册一个
//   await User.create({
//       username: '12121131',
//       password: '1212'
//   })

  // 登录：查询单个用户
  const zhangsan = await User.findOne({
      username: 'zhangsan',
      password: '123'
  })
  console.log(zhangsan)

})()