<template>
  <!-- 底部导航栏 -->
  <!-- 高亮和跳转 -->
  <div class="docker">
    <div v-for="(item, index) in dockerlist"
    :class="{'docker__item':true,'docker__item--active':index===currentIndex }"
    class="docker__item"
    :key="item.icon"
    >
      <router-link :to='item.to'>
        <div class="iconfont" v-html="item.icon"/>
        <div class="docker__title">{{item.text}}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
//  这里有两个逻辑要注意
//  1、高亮展示的部分
//  2、指定跳转到哪个页面
export default {
  name: 'Docker',
  props: ['currentIndex'],
  setup () {
    const dockerlist = [
      { icon: '&#xe607;', text: '首页', to: { name: 'Home' } },
      { icon: '&#xe750;', text: '购物车', to: { name: 'CartList' } },
      { icon: '&#xe61e;', text: '订单', to: { name: 'OrderList' } },
      { icon: '&#xe640;', text: '我的', to: { name: 'Person' } }
    ]
    return { dockerlist }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/viriables.scss';
.docker {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  border-top: 0.01rem  solid $content-bgcolor;
  font-size: 0.2rem;
  display: flex;
  padding: 0 0.18rem;
  box-sizing: border-box;
  color: $content-fontcolor;
  background-color:$bgColor;
    //这里是scss语法：等同于css中的 .docker__item
    &__item {
    flex: 1;
    text-align: center ;
    .iconfont {
      margin: 0.07rem 0 0.02rem 0;
      font-size: 0.18rem；;
        }
    a{
      color: $content-fontcolor
    }
    &--active {
      a{color: #1fa4fc;}
    }
}
  //这里是因为最小字体是12px，而我们要做到10px
  &__title {
    font-size: 0.2rem;
    transform: scale(0.5, 0.5);
    transform-origin: center top;
}
}

</style>
