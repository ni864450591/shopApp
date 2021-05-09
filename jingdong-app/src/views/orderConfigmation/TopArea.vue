<template>
    <div class="top">
        <div class="top__header">
            <div
            class="top__header__back iconfont"
            @click="handleBackClick"
            >&#xe697;</div>
            确认订单
        </div>
        <div class="top__receiver">
            <div class="top__receiver__title">收货地址</div>
            <div class="top__receiver__address">北京理工大学国防科技园2号楼10层</div>
            <div class="top__receiver__info">
                <span class="top__receiver__info__name">瑶妹（先生）</span>
                <span class="top__receiver__info__tel">18911024266</span>
            </div>
            <div class="top__receiver__icon iconfont">&#xe697;</div>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'TopArea',
  setup () {
    const router = useRouter()
    const handleBackClick = () => { router.back() }
    return { handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.top{
  height:1.96rem;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(0deg, rgba(0,145,255,0.00) 4%, $btn-color 50%);
  background-repeat: no-repeat;
  background-color: $wrapper-bgcolor;
  position: relative;
  &__header{
    padding-top:.2rem;
    line-height: .24rem;
    color:$bgColor;
    text-align: center;
    position: relative;
    font-size:.18rem;
    &__back{
        position:absolute;
        left:.18rem;
        font-size:.22rem;
    }
  }
  &__receiver{
    position:absolute;
    right:.18rem;
    left:.18rem;
    height:1rem;
    bottom:0;
    background:$bgColor;
    border-radius:.04rem;
    padding:.16rem;
    &__title{
        line-height: .22rem;
        margin-bottom:.14rem;
        font-size: .16rem;
        color:$content-fontcolor;
    }
    &__address{
        font-size: .14rem;
        color:$content-fontcolor;
        padding-right:.24rem;
        line-height: .2rem;
    }
    &__info{
        margin-top:.16rem;
        font-size: .12rem;
        color: $medium-fontcolor;
        line-height: .18rem;
    }
    &__icon{
        position: absolute;
        right: .16rem;
        bottom: .55rem;
        color:$medium-fontcolor;
        font-size: .2rem;
        transform: rotate(180deg);
    }
  }
}
</style>
