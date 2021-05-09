// 购物车信息的操作
import { useStore } from 'vuex'
import { toRefs, computed } from 'vue'
export const useCommonCartEffect = (shopId) => {
  const store = useStore()
  const { cartList } = toRefs(store.state)
  //  触发购物车更新
  const changeCartItem = (shopId, productId, productInfo, num) => {
    store.commit('changeCartItem', { shopId, productId, productInfo, num })
  }
  //  产品列表是一个计算属性，且里面只存储了数量不为0的商品
  const productList = computed(() => {
    const productList = cartList.value[shopId]?.productList || {}
    const notEmptyProductList = {}
    let j = 0
    for (const i in productList) {
      if (productList[i].count) { notEmptyProductList[j++] = productList[i] }
    }
    return notEmptyProductList
  })
  //  商铺名也是一个计算属性
  const shopName = computed(() => {
    return cartList.value[shopId]?.shopName || ''
  })
  //  按照不同商铺计算购物车里的商品的数量 total，商品的总价 prcie，以及全选状态
  const caculations = computed(() => {
    const productList = cartList.value[shopId]?.productList
    const result = { total: 0, price: 0, allCheck: true }
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        result.total += product.count
        if (product.check) {
          result.price += product.count * product.price
        }
        if (product.count > 0 && !product.check) {
          result.allCheck = false
        }
      }
    }
    result.price = result.price.toFixed(2)
    return result
  })
  //  返回的是购物车的信息，改变商品数量的方法, 不为0的产品列表, 商铺名,一些需要的计算属性(总数，总价，全选状态)
  return { cartList, changeCartItem, productList, shopName, caculations }
}
