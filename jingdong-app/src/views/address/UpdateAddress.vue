<template>
     <div class="header">
        <span class="header__back iconfont" @click="handleBackClick">&#xe697;</span>
        <span class="header__text">{{message}}</span>
        <span class="header__new" @click="() => { handleSaveClick() }">保存</span>
     </div>
     <div class="content">
        <div class="content__item">
        所在城市:<input type="text" v-model="address.city" placeholder="如北京市朝阳区">
        </div>
        <div class="content__item">
        小区/大厦/学校：<input type="text" v-model="address.department"  placeholder="如光华小区">
        </div>
        <div class="content__item">
        楼号-门牌号:<input type="text" v-model="address.housenumber" placeholder="3号楼10层303">
        </div>
        <div class="content__item">
        收货人：:<input type="text" v-model="address.name"  placeholder="如请填写收货人姓名">
        </div>
        <div class="content__item">
        联系电话：:<input type="text"  v-model="address.phone" placeholder="请填写收货人联系电话">
        </div>
    </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { post, patch, get } from '../../utils/request'
import { reactive, toRefs } from 'vue'
//  地址的新建或更新
const useTopEffect = () => {
  const router = useRouter()
  const route = useRoute()
  const data = reactive({ address: {} })
  const addressId = route.params.id
  const addressObj = { }
  const message = addressId ? '编辑地址' : '新建地址'
  const handleBackClick = () => {
    router.back()
  }
  const handleSaveClick = async () => {
    const { city, department, housenumber, name, phone } = address.value
    addressObj.city = city
    addressObj.department = department
    addressObj.housenumber = housenumber
    addressObj.name = name
    addressObj.phone = phone
    if (addressId) {
      //  有地址id即是更新
      const res = await patch(`api/user/address/${addressId}`, addressObj)
      if (res.errno === 0) { router.back() }
    } else {
      const res = await post('api/user/address', addressObj)
      if (res.errno === 0) { router.back() }
    }
  }
  const getAddress = async () => {
    //  先获取单个收货地址(id)
    const result = await get(`api/user/address/${addressId}`)
    if (result?.errno === 0 && result?.data) {
      data.address = result.data
    }
  }
  const { address } = toRefs(data)
  return { handleBackClick, handleSaveClick, message, getAddress, address, addressId }
}

export default {
  name: 'UpdateAddress',
  setup () {
    const { handleBackClick, message, handleSaveClick, getAddress, address, addressId } = useTopEffect()
    if (addressId) getAddress()
    return { handleBackClick, message, handleSaveClick, address }
  }
}

</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins';
.wrapper{
@include wrapper;
}
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
.content{
  margin-top:.12rem;
  background-color: $bgColor;
  padding:0 .18rem;
  &__item{
    line-height: .44rem;
    border-bottom: 0.01rem solid $content-bgcolor;
    font-size: .14rem;
    color: $medium-fontcolor;
    input{
      outline: none;
      border:none;
      background-color:none;
      color: $light-fontcolor;
      @include  ellipse;
    }
  }
}
</style>
