<template>
  <div class="wrapper">
    <ManageTop/>
    <ManageContent/>
  </div>
</template>

<script>
import ManageTop from './ManageTop'
import ManageContent from './ManageContent'

export default {
  name: 'ManageAddress',
  components: { ManageTop, ManageContent }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixins';
.wrapper{
@include wrapper;
overflow-y:scroll;
}
</style>
