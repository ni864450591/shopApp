<template>
   <div class="product">
        <div class="product__title">{{shopName}}</div>
        <div
        v-for="item in productList"
        :key="item._id"
        class="product__item"
        >
            <img :src="item.imgUrl" class="product__item__img">
            <div class="product__item__detail">
                <h4 class="product__item__title">{{item.name}}</h4>
                <p class="product__item__price">
                    <span class="product__item__price__single">
                        <span class="product__item__yen">&yen;</span>{{item.price}}X{{item.count}}
                    </span>
                    <span class="product__item__price__total">
                        <span class="product__item__yen">&yen;</span>{{(item.price * item.count).toFixed(2)}}
                    </span>
                </p>
            </div>
        </div>
        <div class="product__count">
            <span class="product__count__text">共计3件/1.4kg</span>
            <span class="product__count__icon iconfont">&#xe697;</span>
        </div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffects'
export default {
  name: 'ProductList',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { productList, shopName } = useCommonCartEffect(shopId)
    return { productList, shopName }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins';
.product{
  margin:.16rem .18rem .55rem .18rem;
  background-color: $bgColor;
  overflow:hidden;
  &__title{
      font-size: .16rem;
      padding:.16rem;
      padding-bottom:0;
      color:$content-fontcolor;
  }
  &__item{
     display: flex;
     position: relative;
     padding:.16rem;
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
      &__icon{
        display: inline-block;
        transform: rotate(270deg);
      }
    }
}
</style>
