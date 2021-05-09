<template>
  <!-- nearshop -->
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <router-link
      :to="`/shop/${item._id}`"
      v-for="item in nearbyList"
      :key="item._id"
    >
      <ShopInfo
      :item="item"
      />
    </router-link>
  </div>
</template>

<script>
import { ref } from 'vue'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo'

//  获取店铺列列表，不用传参
//  去看后端的API文档和model文档里面对接口的要求和对数据的格式化
const useNearbyListEffect = () => {
  //  这里用ref获取数据的时候会简单一点
  const nearbyList = ref([])
  const getNeabList = async () => {
    const result = await get('/api/shop/hot-list')
    if (result?.errno === 0 && result?.data?.length !== 0) {
      nearbyList.value = result.data
    }
  }
  return { nearbyList, getNeabList }
}
export default {
  name: 'Nearby',
  components: { ShopInfo },
  setup () {
    const { nearbyList, getNeabList } = useNearbyListEffect()
    getNeabList()
    return { nearbyList }
  }
}
</script>

<style lang='scss' scoped>
@import "../../style/viriables.scss"; //主题颜色等
//nearshop
.nearby {
  &__title {
    margin: 0.16rem 0 0.02rem 0;
    font-size: 0.18rem;
    font-weight: normal;
    color: $content-fontcolor;
  }
}
</style>
