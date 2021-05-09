import { createStore } from 'vuex'
//  学完也记得多去看看文档 https://vuex.vuejs.org/zh/
//  把购物车的数据放在本地缓存中,不过得先变成JSON格式
const setLocalCartList = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}

//  取到本地缓存的购物车数据，没有则置为空对象,取到后得置为js格式
const getSeesionCartList = () => {
  return localStorage.cartList ? JSON.parse(localStorage.cartList) : {}
}

//  数据结构特别重要，写之前要思考数据结构应该如何设置
//  购物车得按不同商铺存放不同产品的数据：商铺 ；商铺名  商铺的产品
export default createStore({
  state: {
    cartList: getSeesionCartList()
    // cartList: {
    //   //
    //   // 第一层级是商铺的id
    //   // shopId: {
    //   //   shopName:'沃尔玛'
    //   //   // 第二层级是商铺下的产品列表
    //   //   productList:{
    //   //  第三层级是商铺下产品列表下的各个产品
    //   //   productId: {
    //   //     _id: '1',
    //   //     name: '番茄250g/份',
    //   //     imgUrl: 'http://www.dell-lee.com/imgs/vue3/tomato.png',
    //   //     sales: 10,
    //   //     price: 33.6,
    //   //     oldPrice: 39.6,
    //   //     count: 2
    //   //   }
    //   //  }
    //   // }
    // }
    //  地址信息，每个人都可能会有多个地址
    //  addressLists: {
    //  userId：{  userName："小慕"
    //  addressList :{ city:'北京',home: "光华小区", housenumber :'303-1', name: "收货人" ,tel:'1929291212' } }
    // addressLists: {
    //   1: {
    //     userName: '热心市民李先生',
    //     addressList: {
    //       1: {
    //         _id: 1,
    //         city: '北京市海淀区西三环北路',
    //         home: '北京理工大学 国防科技园',
    //         houseNumber: '2号楼10层',
    //         name: '小慕',
    //         tel: '18911023261'
    //       },
    //       2: {
    //         _id: 2,
    //         city: '南京市栖霞区南京师范大学',
    //         home: '桂苑',
    //         houseNumber: '3号楼19层',
    //         name: '小陈',
    //         tel: '11101010100'
    //       }
    //     }
    //   }
    // }
  },
  //  都是同步操作
  mutations: {
    //  改变购物车里商品的数量
    changeCartItem (state, payload) {
      //  需要商铺的id和商品的id，如果一开始购物车里面没有，还需要商品的基本信息，num表示改变的数量，目前只能+1/-1
      const { shopId, productId, productInfo, num } = payload
      //  先获得商铺的信息：商铺的名字和产品列表没有就初始化为空
      const shopInfo = state?.cartList[shopId] || { shopName: '', productList: {} }
      //  取到对应产品，可能为空，空就将给予的商品信息给他即可
      let product = shopInfo?.productList[productId]
      if (!product) {
        product = productInfo
        product.count = 0
      }
      //  数量的改变
      product.count += num
      //  数量大于0，首先默认选中
      if (product.count > 0) { product.check = true }
      //  边界的设定
      if (product.count < 0) { product.count = 0 }
      //  修改完商品的信息后正式更改商品信息
      shopInfo.productList[productId] = product
      //  然后再修改商铺的信息
      state.cartList[shopId] = shopInfo
      //  存入本地存储
      setLocalCartList(state)
    },
    //  修改产品的选中状态
    changeCartItemCheck (state, payload) {
      const { shopId, productId } = payload
      const product = state?.cartList[shopId]?.productList[productId]
      product.check = !product.check
      setLocalCartList(state)
    },
    //  设置商铺的名字，每次添加一个商品时需要做的两个步骤(1)修改产品列表信息(2)添加商铺名字
    changeShopName (state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state?.cartList[shopId] || { shopName: '', productList: {} }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    //  清空购物车
    clearCartProduct (state, payload) {
      state.cartList[payload.shopId] = { shopName: '', productList: {} }
      setLocalCartList(state)
    },
    //  全选
    setCartIetmChecked (state, payload) {
      const productList = state?.cartList[payload.shopId]?.productList
      if (productList) {
        for (const i in productList) {
          productList[i].check = true
        }
      }
      setLocalCartList(state)
    }
  },
  actions: {},
  // 将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter
  modules: {}
})
