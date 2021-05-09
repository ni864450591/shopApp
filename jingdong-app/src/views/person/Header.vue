<template>
<div class="header">
      <div class="header__bgc"></div>
      <div class="header__icon iconfont">&#xe639;</div>
      <div class="header__content">
        <img src="http://www.dell-lee.com/imgs/vue3/tomato.png" class="header__content__img"/>
        <div class="header__content__name">热心市民李先生</div>
        <div class="header__content__star">
          <span class="header__content__star__img iconfont">&#xe877;</span>
          <span class="header__content__star__count">16</span>
        </div>
        <div class="header__content__id">ID: 1069643013</div>
        <div class="header__content__line"></div>
        <div class="header__content__desc">
          <div
          class="header__content__desc__item"
          v-for='item in list'
          :key='item.text'
          >
             <div class="header__content__desc__text">{{item.text}}</div>
             <div class="header__content__desc__count">{{item.count}}</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Header',
  setup () {
    const list = [{
      text: '红包', count: '218'
    }, {
      text: '优惠劵', count: '12张'
    }, {
      text: '鲜豆', count: '88'
    }, {
      text: '白条', count: '1000'
    }]
    return { list }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.header{
  &__bgc{
    background-image: linear-gradient(239deg, #3A6FF3 0%, #50C7FB 100%);
    background-repeat: no-repeat;
    border-bottom-left-radius: 90% 40%;
    border-bottom-right-radius: 90% 40%;
    height:2.5rem;
    position:relative;
  }
  &__icon{
    position: absolute;
    top:.42rem;
    right:.21rem;
    width:.24rem;
    height:.2rem;
    color:$bgColor;
    font-size:.2rem;
  }
  &__content{
    position: absolute;
    top:1rem;
    left:.18rem;
    right:.18rem;
    background: $bgColor;
    box-shadow: 0 .08rem .16rem 0 rgba(0,0,0,0.08);
    border-radius: .08rem;
    &__img{
      width:.94rem;
      height:.94rem;
      margin:-.47rem 1.22rem .12rem 1.22rem;
    }
    &__name{
      font-size: .24rem;
      color: #262628;
      text-align: center;
      line-height: .36rem;
      margin-bottom: .02rem;
    }
    &__star{
      position: absolute;
      right:.37rem;
      top:.74rem;
      width:.35rem;
      height:.15rem;
      background-image: linear-gradient(180deg, #BEE700 0%, #8ACA00 100%);
      border-radius: 1rem;
      display: flex;
      &__img{
        font-size:.14rem ;
        color:#FFC700;
        text-align: center;
      }
      &__count{
        font-size: .2rem;
        color: $bgColor;
        transform: scale(.5);
        transform-origin: left center;
        line-height: .15rem;
      }
    }
    &__id{
      font-size: .14rem;
      color: #C1C0C9;
      text-align: center;
      line-height: .2rem;
    }
    &__line{
      height:.01rem;
      width:100%;
      background-color: $content-bgcolor;
      margin:.12rem 0;
    }
    &__desc{
      display: flex;
      margin:.16rem;
      &__item{
      flex:1;
      }
      &__text{
        font-size: .12rem;
        color: #C1C0C9;
        text-align: center;
        margin-bottom: .03rem;
      }
      &__count{
        font-size: .2rem;
        color: #262628;
        text-align: center;
      }
    }
  }
}
</style>
