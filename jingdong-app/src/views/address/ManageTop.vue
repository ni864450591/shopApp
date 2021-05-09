<template>
     <div class="header">
        <span class="header__back iconfont" @click="handleBackClick">&#xe697;</span>
        <span class="header__text">管理我的地址</span>
        <router-link :to="{ name: 'UpdateAddress', params: { } }">
          <span class="header__new">新建</span>
        </router-link>
     </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'ManageTop',
  setup () {
    const router = useRouter()
    const handleBackClick = () => {
      router.push({ name: 'Person' })
    }
    return { handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.header{
  box-sizing: border-box;
  padding:0 .18rem;
  display: flex;
  background-color: $bgColor;
  line-height:.44rem;
  &__back{
    font-size:.2rem;
    color: #B6B6B6;
  }
  &__text{
    flex:1;
    text-align: center;
    font-size: .16rem;
    color: $content-fontcolor;
    margin:0;
  }
  &__new{
    font-size: .14rem;
    color: $content-fontcolor;
  }
}
</style>
