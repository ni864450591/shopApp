<template>
  <div class="wrapper">
    <Header/>
    <Set/>
  </div>
  <Docker :currentIndex="3"/>
</template>

<script>
import Docker from '../../components/Docker'
import Header from './Header'
import Set from './Set'
export default {
  name: 'Person',
  components: { Header, Set, Docker }
}
</script>

<style lang="scss" scoped>
.wrapper{
  position: relative;
  overflow-y: scroll;
  height: 6rem;
}
</style>
