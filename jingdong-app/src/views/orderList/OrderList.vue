<template>
  <div class="wrapper">
   <div class="title">我的订单</div>
   <div class="orders">
     <div
     class="order"
     v-for="(item,index) in list"
     :key="index"
     >
      <div class="order__title">{{item.shopName}}
        <span class="order__status">{{item.isCanceled ? '已取消' : '已下单'}}</span>
      </div>
      <div class="order__content">
        <div class="order__content__imgs">
          <template
          v-for='(innerItem, innerIndex) in item.products'
          :key="innerIndex"
          >
            <img
            v-if="innerIndex<=3"
            :src="innerItem.product.imgUrl"
            class="order__content__img"/>
          </template>
        </div>
         <div class="order__conetnt__info">
          <div class="order__content__price">￥{{item.totalPrice}}</div>
          <div class="order__content__count">共 {{item.totalNumber}} 件</div>
        </div>
       </div>
      </div>
   </div>
  </div>
  <Docker :currentIndex="2"/>
</template>

<script>
import Docker from '../../components/Docker'
import { reactive, toRefs } from 'vue'
import { get } from '../../utils/request'

//  处理订单列表逻辑 创建一个对象，里面有一个空数组来接收数据result
//  不需要配置参数，此时的result不是我们想要的，里面的data才是我们需要的
//  遍历result.data,这里是产品列表，就是cartList
//  去遍历这个cartList,取到了同一个商铺下的producList
//  然后去遍历这个productList,取到了不同的产品 product
//  然后开始计算，totalnum和totalprice，计算完后将其存到productList，此时productList都有了totalnum和totalprice
//  最后更新取到的cartList，然后返回出去，外面遍历的是cartList
const userOederListEffect = () => {
  //  准备容器，这里也有讲究，如何使得获取数据的时候更简单一些
  const data = reactive({ list: [] })
  //  发送请求
  const getNeabList = async () => {
    //  请求订单数据API和返回的数据(后端较难的是订单数据的拼接)
    //  订单是需要根据用户名来查找的，但是登录的时候后端已经把用户名放在了session里了
    const result = await get('/api/order')
    if (result?.errno === 0 && result?.data?.length !== 0) {
      //  接收到了里面的数据，此时的orderList还不是我们需要的订单数据
      const orderList = result.data
      orderList.forEach((order) => {
        //  遍历订单中的商品列表,计算总价，与总数
        const products = order.products || []
        let totalPrice = 0
        let totalNumber = 0
        products.forEach(productItem => {
          totalPrice += (productItem?.product?.price * productItem?.orderSales || 0)
          totalNumber += (productItem?.orderSales || 0)
        })
        order.totalPrice = totalPrice
        order.totalNumber = totalNumber
      })
      data.list = result.data
    }
  }
  getNeabList()
  const { list } = toRefs(data)
  return { list }
}

export default {
  name: 'OrderList',
  components: { Docker },
  setup () {
    const { list } = userOederListEffect()
    return { list }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.wrapper{
  overflow-y: auto;
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0.5rem;
  background:rgb(248,248,248);
}
.title{
  line-height: .44rem;
  background-color: $bgColor;
  text-align: center;
  font-size: .16rem;
  color: $content-fontcolor;
}
.order{
  margin:.16rem .18rem 0 .18rem;
  padding: .16rem;
  border-radius: .04rem;
  background: $bgColor;
  &__title{
    font-size: .16rem;
    color:$content-fontcolor;
    line-height: .22rem;
    margin-bottom: .16rem;
  }
  &__status{
    float:right;
    font-size: .14rem;
    color: $light-fontcolor;
  }
  &__content{
    display: flex;
    &__imgs{
      flex:1;
    }
    &__img{
      width:.4rem;
      height:.4rem;
      margin-right: .12rem;
    }
    &__info{
      width:.7rem;
    }
    &__price{
      font-size: .14rem;
      color: #E93B3B;
      line-height: .2rem;
      margin-bottom: .04rem;
    }
    &__count{
      font-size: .12rem;
      color: $content-fontcolor;
      line-height: .14rem;
    }
  }
}
</style>
