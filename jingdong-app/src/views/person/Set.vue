<template>
 <div class="set">
      <div class="set__item">
        <span class="set__item__icon iconfont money">&#xe618;</span>
        <span class="set__item__text">我的红包</span>
        <span class="set__item__to iconfont">&#xe68b;</span>
      </div>
      <div class="set__item">
        <span class="set__item__icon iconfont address">&#xe60d;</span>
        <span class="set__item__text">我的地址</span>
        <router-link :to="{path:'/manageAddress'}">
        <span class="set__item__to iconfont">&#xe68b;</span>
        </router-link>
      </div>
      <div class="set__item">
        <span class="set__item__icon iconfont kefu">&#xe63f;</span>
        <span class="set__item__text">客服与帮助</span>
        <span class="set__item__to iconfont">&#xe68b;</span>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Set'
}
</script>

<style lang="scss" scoped>
.set{
  position: relative;
  top:.9rem;
  margin:0 .18rem;
  height:1.46rem;
  box-shadow: 0 .08rem .16rem 0 rgba(0,0,0,0.08);
  border-radius: .08rem;
  display: flex;
  flex-direction: column;
  padding:0 .16rem;
  &__item{
    flex:1;
    display: flex;
    align-items: center;
    &__icon{
      width:.22rem;
      line-height:.22rem;
      border-radius:.08rem;
      text-align: center;
      margin-right: .12rem;
    }
    &__text{
      flex:1;
      font-size: .14rem;
      color: #262626;
    }
    &__to{
     font-size: .14rem;
    }
  }
}
.money{
  color:#ED4A47;
}
.address{
  color:#32C5FF;
}
.kefu{
  color:#9013FE
}
</style>
