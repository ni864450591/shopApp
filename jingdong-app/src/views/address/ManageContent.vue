<template>
     <div class="content">
        <div class="content__myAddress" v-if="addressLists">我的收货地址</div>
        <div
        class="content__item"
        v-for='item in addressLists'
        :key='item._id'
        >
           <div class="content__item__info">
               <span class="content__item__name">{{item.name}}</span>
               <span class="content__item__tel">{{item.phone}}</span>
           </div>
           <div class="content__item__address">{{item.city}} {{item.department}}{{item.housenumber}}</div>
           <router-link :to="{ name: 'UpdateAddress', params: { id: item._id } }">
            <span class="content__item__editor iconfont">&#xe68b;</span>
           </router-link>
        </div>
    </div>
</template>

<script>
import { get } from '../../utils/request'
import { reactive, toRefs } from 'vue'
// 获取地址信息
const useAddressEffect = () => {
  //  准备一个容器
  const data = reactive({ addressLists: [] })
  //  获取地址列表(根据用户名，但是用户名在后端的session中已经有了)
  const getAddressListsdata = async () => {
    const result = await get('api/user/address')
    if (result?.errno === 0 && result?.data) {
      data.addressLists = result.data
    }
  }
  const { addressLists } = toRefs(data)
  return { addressLists, getAddressListsdata }
}
export default {
  name: 'ManageContent',
  setup () {
    const { addressLists, getAddressListsdata } = useAddressEffect()
    getAddressListsdata()
    return { addressLists }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.content{
  padding:0 .18rem;
  &__myAddress{
    margin: .16rem 0 .12rem 0;
    font-size: .14rem;
    color: $content-fontcolor;
  }
  &__item{
    position: relative;
    box-sizing: border-box;
    overflow:hidden;
    height: 100%;
    background-color: $bgColor;
    margin-bottom: .16rem;
    border-radius: .04rem;
    padding:.18rem .16rem;
    &__info{
      margin-bottom: .08rem;
      display: flex;
      font-size: .14rem;
      color: $light-fontcolor;
      margin-right:.63rem
    }
    &__name{
      width:.28rem;
      line-height:.2rem;
    }
    &__tel{
      flex:1;
      text-align: center;
    }
    &__address{
      font-size: .14rem;
      color: $content-fontcolor;
      margin-right:.63rem;
    }
    &__editor{
      position: absolute;
      color:$light-fontcolor;
      font-size: .14rem;
      right:.16rem;
      top:.44rem;
    }
  }
}
</style>
