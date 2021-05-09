<template>
  <div class="shop">
    <img :src="item.imgUrl" class="shop__img" v-show="item.imgUrl" />
    <div
    :class="{'shop__content':true, 'shop__content--border':hideborder?false:true}"
    >
      <div class="shop__content__title">{{ item.name }}</div>
      <div class="shop__content__tags">
        <span class="shop__content__tag">月售:{{ item.sales }}</span>
        <span class="shop__content__tag">起送￥{{ item.expressLimit }}</span>
        <span class="shop__content__tag"
          >基础运费￥{{ item.expressPrice }}</span
        >
      </div>
      <p class="shop__content__highlight">{{ item.slogan }}</p>
    </div>
  </div>
</template>

<script>
//  商铺顶部的介绍和首页商铺的介绍共用的组件
//  这里有一个逻辑要注意
//  1、就是防止裂图的产生，在没有获取到imgUrl的时候不显示图片
//  2、首页底部有下划线，商铺页面的没有
export default {
  name: 'ShopInfo',
  props: ['item', 'hideborder']
}
</script>

<style lang="scss" scoped>
@import "../style/viriables.scss";
.shop {
  padding-top: 0.12rem;
  display: flex;
  &__img {
    width: 0.56rem;
    height: 0.56rem;
    margin-right: 0.16rem;
  }
  &__content {
    flex: 1;
    padding-bottom: 0.12rem;
    &--border {
      border-bottom: .01rem solid $content-bgcolor;
    }
    &__title {
      line-height: 0.12rem;
      font-size: 0.16rem;
      color: $content-fontcolor;
    }
    &__tags {
      margin-top: 0.08rem;
      line-height: 0.18rem;
      font-size: 0.13rem;
      color: $content-fontcolor;
    }
    &__tag {
      margin-right: 0.16rem;
    }
    &__highlight {
      margin: 0.08rem 0 0 0;
      line-height: 0.18rem;
      font-size: 0.13rem;
      color: #e93b3b;
    }
  }
}
</style>
