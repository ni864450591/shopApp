<template>
    <div class="order">
        <div class="order__price">实付金额 <b>￥{{caculations.price}}</b></div>
        <div class="order__btn" @click='handleShowConfirm'>提交订单</div>
    </div>
    <!-- 弹出是否确认订单 -->
    <div
    class="mask"
    v-show='showConfirm'
    @click='handleShowConfirm'
    >
        <div class="mask__content" @click.stop>
            <div class="mask__content__title">确认要离开收银台？</div>
            <div class="mask__content__desc">请尽快完成支付，否则将被取消</div>
            <div class="mask__content__btns">
                <div
                class="mask__content__btn mask__content__btn--first"
                 @click="()=>{ handleCancelOrder(true) }"
                >取消订单</div>
                <div
                class="mask__content__btn mask__content__btn--last"
                @click="()=>{ handleCancelOrder(false) }"
                >确认支付</div>
            </div>
        </div>
    </div>
</template>

<script>
import { useCommonCartEffect } from '../../effects/cartEffects'
import { useRoute, useRouter } from 'vue-router'
import { post } from '../../utils/request'
import { useStore } from 'vuex'
import { ref } from 'vue'

//  提交订单按钮的事件逻辑
//  遮罩层的显示与否
const submitEffect = () => {
  const showConfirm = ref(false)
  const handleShowConfirm = () => { showConfirm.value = !showConfirm.value }
  return { showConfirm, handleShowConfirm }
}

// 确认支付按钮和取消订单的事件逻辑
//  从购物车根据不同商铺id获取对应的数据：创建订单
//  再将数据发送到后端，后端会返回一个支付成功或失败的标志
const confirmEffect = (shopId) => {
  const router = useRouter()
  const store = useStore()
  //  创建订单需要的API接口格式：最主要是拼接出这个请求体
  // {
  //   addressId: '收货地址的id',   //为了可以找到对应地址并复制
  //   shopId: '商店的id',         //为了找到对应商品
  //   shopNane: '商店的名称',
  //   isCanceled: false, //订单是否被取消
  //   products:[{
  //       _id: '商品的id',
  //       num: 3 //购买数量
  //   }, {
  //       _id: '商品的id',     //这里也成了引用
  //       num: 3 //购买数量
  //   }]
  //  }
  //  商铺名和商品列表直接传入shopId获取即可
  const { shopName, productList } = useCommonCartEffect(shopId)
  const handleCancelOrder = async (isCanceled) => {
    try {
      const products = []
      //  订单的商品列表中的商品id和商品数量
      for (const key in productList.value) {
        const product = productList.value[key]
        products.push({ _id: product._id, num: product.count })
      }
      //  这里的修改收货地址还没能实现
      //  然后发送给后端，然后端创建订单数据
      const result = await post('api/order', {
        addressId: '608e34e85ebab2289cdba76d',
        shopId,
        shopName: shopName.value,
        isCanceled,
        products
      })
      if (result.errno === 0) {
        store.commit('clearCartProduct', { shopId })
        router.push({ name: 'OrderList' })
      } else {
      // 提示支付失败
      }
    } catch (e) {}
  }
  return { handleCancelOrder }
}
export default {
  name: 'OrderBtn',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { caculations } = useCommonCartEffect(shopId)
    const { showConfirm, handleShowConfirm } = submitEffect()
    const { handleCancelOrder } = confirmEffect(shopId)
    return { caculations, handleCancelOrder, showConfirm, handleShowConfirm }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.order{
    display: flex;
    line-height: .49rem;
    background: $bgColor;
    position: fixed;
    bottom:0;
    left:0;
    right:0;
    &__price{
        flex:1;
        text-indent:.24rem;
        font-size:.14rem;
        color:$content-fontcolor;
    }
    &__btn{
        width:.98rem;
        background:#4FB0F9;
        color:$bgColor;
        text-align: center;
        font-size:.14rem;
    }
}
.mask{
    position:absolute;
    left:0;
    right:0;
    bottom:0;
    top:0;
    background: rgba(0,0,0,0.50);
    z-index:1;
    &__content{
        width:3rem;
        height:1.58rem;
        background: #fff;
        position:absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        border-radius: .04rem;
        text-align: center;
        &__title{
            font-size:.18rem;
            color: #333333;
            margin:.24rem 0 .08rem 0;
            line-height: .26rem;
        }
        &__desc{
            font-size: .14rem;
            color: #666666;
            line-height: .2rem;
            margin-bottom: .24rem;
        }
        &__btns{
            margin:0 .58rem;
            display: flex;
        }
        &__btn{
              flex:1;
              width:.8rem;
              line-height: .32rem;
              border-radius: .16rem;
              font-size:.14rem;
              border: .01rem solid #4FB0F9;
              color:#0091FF;
            &--first{
                margin-right:.24rem;
            }
            &--first:hover,
            &--last:hover{
                color:#fff;
                background: #4FB0F9;
            }
          }
    }
}
</style>
