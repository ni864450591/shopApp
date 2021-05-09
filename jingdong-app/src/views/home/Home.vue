<template>
<div>
    <div class="wrapper">
      <StaticPart/>
      <Nearby/>
     </div>
     <Docker :currentIndex="0"/>
</div>
</template>

<script>
import StaticPart from './StaticPart'
import Nearby from './Nearby'
import Docker from '../../components/Docker'
export default {
  name: 'Home',
  components: { StaticPart, Nearby, Docker }
}
</script>
<style lang='scss' scoped>
  .wrapper{
    overflow-y: auto;    //使其出现纵向滚动，不要溢出
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0.5rem;
    padding:0 .18rem 0.1rem .18rem;  //底部留白
  }
</style>
