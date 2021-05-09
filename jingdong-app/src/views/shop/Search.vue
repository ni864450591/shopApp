<template>
<div class="search">
    <div class="search__back iconfont" @click="handleBackClick">&#xe697;</div>
    <div class="search__content">
      <span class="search__content__icon iconfont">&#xe630;</span>
      <input type="text" class="search__content__input" placeholder="请输入商品名称搜索"/>
    </div>
</div>
</template>

<script>
import { useRouter } from 'vue-router'
//  处理返回按钮
const useBackEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return handleBackClick
}
export default {
  name: 'Serach',
  setup () {
    const handleBackClick = useBackEffect()
    return { handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.search{
  display: flex;
  margin:.14rem 0 .02rem 0;
  &__back{
    width:.3rem;
    line-height: .32rem;
    font-size: .24rem;
    color:#B6B6B6;
  }
  &__content{
    flex:1;
    background:$search-input-bgcolor;
    border-radius: .16rem;
    display: flex;
    &__icon{
      position: relative;
      top:.02rem;
      width:.44rem;
      text-align: center;
      line-height: .32rem;
      font-size: .16rem;
      color:$search-input-color;
    }
    &__input{
      display: block;
      background: none;
      outline: none;
      border: none;
      width:100%;
      padding-right:.2rem;
      line-height: .32rem;
      font-size: .16rem;
      color: $content-fontcolor;
    }
  }
}
</style>
