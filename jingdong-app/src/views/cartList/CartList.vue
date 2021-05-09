<template>
  <div class="wrapper">
    <div class="header">我的全部购物车({{totalShop}})</div>
    <template
    v-for='item in cartListValue'
    :key="item.shopName"
    >
      <div
      class="product"
      v-if = "item.totalNumber>0"
      >
        <div class="product__title">{{item.shopName}}</div>
        <template
        v-for="innerItem in item.productList"
        :key="innerItem._id"
        >
          <div
          class="product__item"
          v-if="innerItem.count > 0"
          >
            <img :src="innerItem.imgUrl" class="product__item__img">
            <div class="product__item__detail">
                <h4 class="product__item__title">{{innerItem.name}}</h4>
                <p class="product__item__price">
                    <span class="product__item__price__single">
                        <span class="product__item__yen">&yen;</span>{{innerItem.price}}X{{innerItem.count}}
                    </span>
                    <span class="product__item__price__total">
                        <span class="product__item__yen">&yen;</span>{{(innerItem.price*innerItem.count).toFixed(2)}}
                    </span>
                </p>
            </div>
          </div>
        </template>
        <div class="product__count">
            <span class="product__count__text">共计{{item.totalNumber}}件</span>
            <span class="product__count__icon iconfont">&#xe697;</span>
        </div>
      </div>
    </template>
  </div>
  <Docker :currentIndex="1"/>
</template>

<script>
import Docker from '../../components/Docker'
import { useStore } from 'vuex'
import { toRefs } from 'vue'
// import ProductList from '../orderConfigmation/ProductList'

//  const { cartList } = toRefs(store.state)  然后再根据shopId取到productList，再根据productId到product
//  然后就可以取到了name price 和count
//   要统计的是商品的数量和商铺的数量
//  这里调测的时候有一个问题，其中商品数量为0的也会在购物车中显示，所以要剔除掉

//  计算商铺数和商品数
const useCartEffect = () => {
  const store = useStore()
  const { cartList } = toRefs(store.state)
  const cartListValue = cartList.value
  //  统计购物车中商铺的数量
  let totalShop = 0
  for (const key in cartListValue) {
    //  统计不同商铺购物车中商品的数量
    let totalNumber = 0
    const productList = cartListValue[key].productList
    for (const itemkey in productList) {
      const product = productList[itemkey]
      totalNumber += (product.count || 0)
    }
    if (totalNumber) totalShop++
    cartListValue[key].totalNumber = totalNumber
  }
  cartList.value = cartListValue
  return { cartListValue, totalShop }
}
export default {
  name: 'CartList',
  components: { Docker },
  setup () {
    const { cartListValue, totalShop } = useCartEffect()
    return { cartListValue, totalShop }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins';
.wrapper{
  position: absolute;
  top:0;
  bottom:.3rem;
  left:0;
  right:0;
  background-color: $wrapper-bgcolor;
  overflow-y: scroll;
}
.header{
  line-height: .44rem;
  text-align: center;
  background: $bgColor;
  font-size: .16rem;
  color: $content-fontcolor;
}
.product{
  margin:.16rem .18rem .3rem .18rem;
  background-color: $bgColor;
  overflow:hidden;
  &__title{
      font-size: .16rem;
      padding:.16rem;
      padding-bottom: 0;
      color:$content-fontcolor;
  }
  &__item{
     display: flex;
     position: relative;
     padding:.16rem;
     border-bottom:.01rem solid $content-bgcolor;
    &__img{
        width:.46rem;
        height:.46rem;
        margin-right: .16rem;
    }
     &__detail{
         overflow:hidden;
         flex:1;
     }
     &__title{
         @include ellipse;
         line-height: .2rem;
         font-size: .16rem;
         color: $content-fontcolor;
         margin:0 0 .06rem  0;
     }
     &__price{
         line-height: .2rem;
         margin:0;
         font-size:.14rem;
         display:flex;
        &__single{
            width:0.2rem;
            color: $hightlight-fontColor;
        }
        &__total{
            flex:1;
            text-align: right;
            font-size: .14rem;
            color: $medium-fontcolor;
            font-weight: bold;
        }
     }
     &__yen{
         font-size: .12rem;
     }
    }
  &__count{
    margin: .16rem;
    margin-top: 0;
    text-align: center;
    line-height: .28rem;
    background: $search-input-bgcolor;
    font-size: .14rem;
    color: $light-fontcolor;
    margin-right: .1rem;
    &__icon{
      display: inline-block;
      transform: rotate(270deg);
    }
  }
}
</style>
