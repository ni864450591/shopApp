<template>
  <!--点击购物车的遮罩层  -->
  <div
  class="mask"
  v-if="showCart"
  @click="handleCartShowChange"
  />
  <div class="cart">
    <!-- 点击购物车才需要弹出购物车 -->
    <div class="product" v-if="showCart && caculations.total">
      <div class="product__header">
        <!-- 全选按钮 -->
        <div
        class="product__header__all"
        @click="() => { setCartIetmChecked(shopId) } "
        >
          <span
          class="product__header__icon iconfont"
          v-html="caculations.allCheck ? '&#xe65a;' :'&#xe619;'"
          />
          全选
        </div>
        <!-- 清空购物车的按钮 -->
        <div class="product__header__clear">
          <span
          class="product__header__clear__btn"
          @click="()=>{ clearCartProduct(shopId) }"
          >清空购物车</span>
        </div>
      </div>
      <!-- 商品的显示 -->
      <div
      class="product__item"
       v-for="item in productList"
      :key="item._id"
      >
        <div
        class="product__item__check iconfont"
        v-html="item.check ? '&#xe65a;' : '&#xe619;'"
        @click.stop="() => { changeCartItemCheck(shopId, item._id) }"
        />
        <img :src="item.imgUrl" class="product__item__img">
        <div class="product__item__detail">
          <h4 class="product__item__title">{{item.name}}</h4>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{item.price}}
            <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
          </p>
        </div>
        <div class="product__number">
          <span
          class="product__number__minus iconfont"
          @click="()=>{ changeCartItem(shopId,item._id,item, -1)}"
          v-show="item.count"
          >&#xe634;
          </span>
          {{cartList.[shopId]?.productList?.[item._id]?.count || 0}}
          <span
          class="product__number__plus iconfont"
          @click="()=>{ changeCartItem(shopId,item._id,item, 1) }"
          >&#xe7ba;
          </span>
        </div>
      </div>
  </div>
  <!-- 提交账单 -->
  <div class="check">
      <div class="check__icon">
          <img
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          class="check__icon__img"
          @click="handleCartShowChange"
          />
          <div class="check__icon__tag">{{caculations.total}}</div>
      </div>
      <div class="check__info">
      总计：<span class="check__info__price">&yen;{{caculations.price}}</span>
      </div>
      <div class="check__btn" v-show="caculations.total">
        <router-link :to="{ path: `/OrderConfigmation/${shopId}` }">
          去结算
        </router-link>
      </div>
  </div>
  </div>
</template>

<script>
//  首先购物车的显示与否是通过点击左侧篮子来实现的，showCart为true且总数大于0的时候显示
//  选中的按钮，默认选中，点击一次改变状态
//  全选按钮，默认全选，只要其中一个没选中就不会显示全选
//  清空购物车，将购物车里面的东西全部删除
//  加减按钮的实现
//  计算总价，总数，全选状态
//  总数为0时结算按钮不显示
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { useCommonCartEffect } from '../../effects/cartEffects'

//  下面购物车数量和金额的计算
const useCartEffect = (shopId) => {
  const store = useStore()
  const { changeCartItem, productList, caculations, cartList } = useCommonCartEffect(shopId)
  //  改变选中状态
  const changeCartItemCheck = (shopId, productId) => {
    store.commit('changeCartItemCheck', {
      shopId, productId
    })
  }
  //  清空购物车
  const clearCartProduct = (shopId) => {
    store.commit('clearCartProduct', { shopId })
  }
  //  全选按钮
  const setCartIetmChecked = (shopId) => {
    store.commit('setCartIetmChecked', { shopId })
  }
  return {
    productList, changeCartItem, changeCartItemCheck, clearCartProduct, cartList, caculations, setCartIetmChecked
  }
}

//  购物车的展示
const toggleCartEffect = () => {
  const showCart = ref(false)
  const handleCartShowChange = () => {
    showCart.value = !showCart.value
  }
  return { showCart, handleCartShowChange }
}
export default {
  name: 'Cart',
  setup () {
    const list = []
    const route = useRoute()
    const shopId = route.params.id
    const { showCart, handleCartShowChange } = toggleCartEffect()
    const {
      productList, cartList, caculations, setCartIetmChecked,
      changeCartItem, changeCartItemCheck, clearCartProduct
    } = useCartEffect(shopId)
    return {
      list, productList, changeCartItem, shopId, changeCartItemCheck, clearCartProduct, cartList, caculations, setCartIetmChecked, showCart, handleCartShowChange
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins';
.mask{
  position: fixed;
  bottom:0;
  left:0;
  right:0;
  top:0;
  background: rgba(0,0,0,.5);
  z-index:1;
}
.cart{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index:2;
  background-color: $bgColor;
}
.product{
  flex:1;
  overflow-y: scroll;
  background: $bgColor;
  &__header{
    display: flex;
    line-height: .52rem;
    border-bottom: .01rem solid $content-bgcolor;
    color: $content-fontcolor;
    font-size: .16rem;
    &__icon{
      font-size: .18rem;
      color:$btn-color;
      vertical-align: top;
      margin-right:.1rem;
    }
    &__all{
      width: .76rem;
      margin-left: .2rem;
    }
    &__clear{
      flex:1;
      text-align: right;
      margin-right: .18rem;
      &__btn{
        display: inline-block;
      }
    }
  }
  &__item{
    position: relative;
    padding-top:.12rem;
    margin:0 .16rem;
    border-bottom: .01rem solid $content-bgcolor;
    display: flex;
    &__check{
      line-height: .5rem;
      color:$btn-color;
      margin-right: .1rem;
    }
    &__img{
      width:.46rem;
      height:.461rem;
      margin-right: .16rem;
    }
    &__detail{
      overflow:hidden;
    }
    &__title{
      @include ellipse;
      line-height: .2rem;
      font-size: .16rem;
      color: $content-fontcolor;
      margin:0;
    }
    &__price{
      line-height: .2rem;
      color: $content-fontcolor;
      margin-top:.06rem;
      font-size:.14rem;
      color: $hightlight-fontColor;
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
      bottom:.26rem;
      right:0;
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
.check{
  height:.49rem;
  line-height: .49rem;
   border-top: .01rem solid $content-bgcolor;
  display: flex;
  &__icon{
     position: relative;
     width: .84rem;
    &__img{
     display: block;
     width: .28rem;
     height: .26rem;
     margin:.12rem auto;
    }
    &__tag{
     position:absolute;
     top: 0.04rem;
     left:.45rem;
     padding:.0 .04rem;
     min-width:.2rem;
     height: .2rem;
     font-size:.16rem;
     border-radius: .1rem;
     background-color: $hightlight-fontColor;
     color:$bgColor;
     text-align: center;
     line-height: .2rem;
     transform: scale(.5);
     transform-origin: left center;
    }
  }
  &__info{
      flex:1;
      color:$content-fontcolor;
      font-size:.12rem;
    &__price{
      font-size:.18rem;
      color:$hightlight-fontColor;
    }
  }
  &__btn{
      width:.98rem;
      background-color: $btn-color;
      line-height: .5rem;
      font-size: .16rem;
      text-align: center;
    a{
      color:$bgColor;
    }
  }
}
</style>
