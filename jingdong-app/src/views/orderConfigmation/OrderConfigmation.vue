<template>
 <div class="wrapper">
    <TopArea/>
    <ProductList/>
    <OrderBtn/>
  </div>
</template>

<script>
import TopArea from './TopArea'
import ProductList from './ProductList'
import OrderBtn from './OrderBtn'
export default {
  name: 'OrderConfigmation',
  components: { TopArea, ProductList, OrderBtn }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixins';
.wrapper{
 @include wrapper;
  overflow-y: scroll;
}
</style>
