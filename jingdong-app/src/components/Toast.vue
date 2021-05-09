<template>
   <div class="toast">{{ message }}</div>
</template>

<script>
//  这里可以优化
//  弹窗内容的显示：先是父组件拿到了弹窗内容设置的方法，然后在登录事件中使用，使用的时候只需要提供弹框的内容即可
//  然后再在弹窗组件中设置弹窗内容，返回出去，父组件再返回回来
//  这里应该是父组件只提供弹窗的内容,然后设置完后弹窗的内容后子组件自己展示，不需要通过父组件传参的方式来显示
import { reactive, toRefs } from 'vue'
export default {
  name: 'Toast',
  props: ['message']
}
// 这里是弹框的逻辑
export const useToastEffect = () => {
  //  弹框的显示与否，以及弹框需要显示的内容
  const toastData = reactive({
    showToast: false,
    toastmessage: ''
  })
  // 这里是设置弹框的内容，2s后弹框消失,并将内容置空
  const toastMessage = (message) => {
    toastData.showToast = true
    toastData.toastmessage = message
    setTimeout(() => {
      toastData.showToast = false
      toastData.toastmessage = ''
    }, 2000)
  }
  const { showToast, toastmessage } = toRefs(toastData)
  return { showToast, toastmessage, toastMessage }
}
</script>

<style lang='scss' scoped>
@import '../style/viriables';
.toast{
    position: fixed;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0 , .35);
    border-radius:  .05rem;
    padding: .1rem;
    color:$bgColor;
    font-size:  .16rem;
    text-align: center;
}
</style>
