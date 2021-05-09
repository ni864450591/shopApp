<template>
    <div class="content">
        <div class="category">
            <div
            :class="{'category__item':true,'category__item--active':currentTab === item.tab}"
            v-for="item in categoryList"
            :key="item.name"
            @click="handleTabClick(item.tab)"
            >
            {{item.name}}
            </div>
        </div>
        <div class="product">
            <div
            class="product__item"
            v-for="item in contentList"
            :key="item._id"
            >
                <img :src="item.imgUrl" class="product__item__img">
                <div class="product__item__detail">
                    <h4 class="product__item__title">{{item.name}}</h4>
                    <p class="product__item__sales">月售:{{item.sales}}</p>
                    <p class="product__item__price">
                        <span class="product__item__yen">&yen;</span>{{item.price}}
                        <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
                    </p>
                </div>
                <div class="product__number">
                    <span
                    class="product__number__minus iconfont"
                    @click="()=>{ changeCartListItem(shopId,item._id,item, -1, shopName)}"
                    v-show="getProductCount(shopId, item._id)"
                    >&#xe634;
                    </span>
                    {{getProductCount(shopId, item._id)}}
                    <span
                    class="product__number__plus iconfont"
                    @click="()=>{ changeCartListItem(shopId,item._id,item, 1, shopName) }"
                    >&#xe7ba;
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//  主要分为两部分，一个是左侧的导航栏，一个是右侧的商品
//  左侧导航栏暂时没什么功能，只有一个高亮展示的逻辑
//  右侧主要是数据获取后的展示，以及加减按钮的逻辑
//  发送请求到后端，后端根据商铺id及tab值返回id
//  但是每次商品数据变化，我们都得重新获取数据，此时就需要使用watchEffect
import { get } from '../../utils/request'
import { useStore } from 'vuex'
import { reactive, toRefs, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffects'

//  左侧导航栏内容
const categoryList = [
  { name: '全部商品', tab: 'all' },
  { name: '秒杀', tab: 'seckill' },
  { name: '新鲜水果', tab: 'fruit' }
]

// 和tab相关的逻辑，默认是all
const useTabEffect = () => {
  const currentTab = ref(categoryList[0].tab)
  const handleTabClick = (tab) => {
    currentTab.value = tab
  }
  return { currentTab, handleTabClick }
}

// 和获取当前列表相关的逻辑,返回contentList
const useCurrentListEffect = (currentTab, shopId) => {
  //  用reactive是为了后面获得数据方便
  const content = reactive({ contentList: [] })
  //  根据shopId和tab获取商品数据
  const getContentData = async () => {
    const result = await get(`api/shop/${shopId}/products`, { tab: currentTab.value })
    if (result?.errno === 0) {
      content.contentList = result.data
    }
  }
  // 依赖的东西发生变化，里面东西就会执行，让他自己去监听，然后自己去获取数据，不用我们调用函数去获取数据
  // 使他依赖currentTab currtentab变化它就会重新获取数据，而且不是lazy的
  watchEffect(() => { getContentData() })
  const { contentList } = toRefs(content)
  return { contentList }
}

// 和购物车相关的逻辑，此时就是加减按钮的功能
//  两个功能：一个改变商铺数量，一个设置商铺名称
//  返回cartList和修changeCartListItem，以及getProductCount
const useCartEffect = () => {
  //  拿到了购物车的数据和以及对购物车修改的方法
  const { changeCartItem, cartList } = useCommonCartEffect()
  const store = useStore()
  // 设置商铺名，因为购物车中需要商铺名和商品的信息
  const changeShopName = (shopId, shopName) => {
    store.commit('changeShopName', { shopId, shopName })
  }
  //  设置(修改)购物车中商品的信息+购买的数量 需要知道修改的是哪个商铺的哪种商品
  const changeCartListItem = (shopId, productId, item, num, shopName) => {
    changeCartItem(shopId, productId, item, num)
    //  如果不存在该商铺的信息，再去设置商铺名
    if (!cartList.value?.[shopId]?.shopName) changeShopName(shopId, shopName)
  }
  //  获取商铺中对应商品的数量 同样需要知道是哪个商铺的哪种商品
  const getProductCount = (shopId, productId) => {
    return cartList.value?.[shopId]?.productList?.[productId]?.count || 0
  }
  return { cartList, changeCartListItem, getProductCount }
}

export default {
  name: 'Content',
  props: ['shopName'],
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { currentTab, handleTabClick } = useTabEffect()
    const { contentList } = useCurrentListEffect(currentTab, shopId)
    const { cartList, changeCartListItem, getProductCount } = useCartEffect()
    return {
      contentList, categoryList, currentTab, handleTabClick, shopId, changeCartListItem, cartList, getProductCount
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins';
.content{
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    top: 1.5rem;
    bottom: .5rem;
}
.category{
    height: 100%;
    width: .76rem;
    background-color:$search-input-bgcolor;
    overflow-y: scroll;
    &__item{
        line-height: .4rem;
        text-align: center;
        font-size: .14rem;
        color:$content-fontcolor;
        &--active{
             background-color:$bgColor;
        }
    }
}
.product{
    flex:1;
    overflow-y: scroll;
    &__item{
        position: relative;
        padding:.12rem 0;
        margin:0 .16rem;
        border-bottom: .01rem solid $content-bgcolor;
        display: flex;
        &__detail{
            overflow:hidden;
        }
        &__img{
            width:.68rem;
            height:.68rem;
            margin-right: .16rem;
        }
        &__title{
            @include ellipse;
            line-height: .2rem;
            font-size: .16rem;
            color: $content-fontcolor;
            margin:0;
        }
        &__sales{
            line-height: .2rem;
            margin:.06rem 0;
            font-size: .12rem;
            color:$content-fontcolor;
        }
        &__price{
            line-height: .2rem;
            color: $content-fontcolor;
            margin:0;
            font-size:.14rem;
            color: #E93B3B;
        }
        &__yen{
            font-size: .12rem;
        }
        &__origin{
             line-height: .2rem;
             font-size: .12rem;
             color:$light-fontcolor;
             text-decoration: line-through;
             margin-left:.06rem;
        }
        .product__number{
            position: absolute;
            bottom:.12rem;
            right:0;
            font-size: .2rem;
            &__minus{
                 color:$medium-fontcolor;
                 margin-right: .1rem;
            }
            &__plus{
                color:$btn-color;
                margin-left:.1rem;
            }
        }
    }
}
</style>
