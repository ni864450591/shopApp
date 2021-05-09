<template>
<div class="wrapper">
  <Search/>
  <ShopInfo
  :item="item"
  :hideborder=true
  />
  <Content :shopName="item.name"/>
  <Cart/>
</div>
</template>

<script>
// 1、页面可分为4部分，也就是4个组件 顶部搜索框 商铺介绍 内容介绍 底部购物车
// 2、父组件主要执行数据的获取，将数据传递给商铺介绍，并将商铺名传递给内容介绍
import { useRoute } from 'vue-router'
import { get } from '../../utils/request'
import { reactive, toRefs } from 'vue'
import ShopInfo from '../../components/ShopInfo'
import Content from './Content'
import Cart from './Cart'
import Search from './Search'

// 获取商品数据
const useShopItemEffect = () => {
  const route = useRoute()
  const data = reactive({ item: {} })
  //  根据商铺id获取单个商铺的数据，然后放在item中传过shopinfo
  const getItemdata = async () => {
    const result = await get(`api/shop/${route.params.id}`)
    if (result?.errno === 0 && result?.data) {
      data.item = result.data
    }
  }
  const { item } = toRefs(data)
  return { item, getItemdata }
}

export default {
  name: 'Shop',
  components: { ShopInfo, Content, Cart, Search },
  setup () {
    const { item, getItemdata } = useShopItemEffect()
    getItemdata()
    return { item }
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
  padding:0 .18rem
}
</style>
