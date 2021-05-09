<template>
    <div class="wrapper">
        <img src="http://www.dell-lee.com/imgs/vue3/user.png" class="wrapper__img"/>
        <div class="wrapper__input">
            <input
            type="text"
            class="wrapper__input__content"
            placeholder="请输入用户名"
            v-model="username"
            />
        </div>
        <div class="wrapper__input">
            <input
              type="password"
              class="wrapper__input__content"
              placeholder="请输入密码"
              autocomplete="new-password"
              v-model="password"
            />
        </div>
         <div class="wrapper__input">
            <input
              type="password"
              class="wrapper__input__content"
              placeholder="请再次输入密码"
              v-model="ensurement"
            />
        </div>
        <div class="wrapper__register-button" @click="handleRegister">注册</div>
        <router-link :to="{path:'/login'}">
          <div class="wrapper__register-link">已有账号去登陆</div>
        </router-link>
        <Toast v-if = 'showToast' :message = 'toastmessage'/>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast'

// 这里抽离注册的逻辑和数据
//  逻辑和思路
//  1、还是准备好接收用户输入，然后进行双向数据绑定
//  2、检验是否合法输入，然后发送后端(发送时要去看后端的接口要求及返回的数据)
//  USer:Schema Model
//  3、注册成功后跳到登录页面，失败则弹出注册失败
const useRegisterEfffect = (toastMessage) => {
  const router = useRouter()
  const data = reactive({
    username: '',
    password: '',
    ensurement: ''
  })

  const handleRegister = async () => {
    const { username, password, ensurement } = data
    if (username === '') {
      toastMessage('必须输入用户名')
      return
    }
    if (password === '') {
      toastMessage('必须输入密码')
      return
    }
    if (password !== ensurement) {
      toastMessage('两次密码不一样，请重新输入')
      return
    }
    try {
      //  这里就跳到了后端，让后端去处理,拿到后端的ctx.body.data
      const result = await post('api/user/register', {
        username,
        password
      })
      if (result.errno === 0) {
        router.push({ name: 'Login' })
      } else {
        toastMessage('注册失败')
      }
    } catch (e) {
      toastMessage('请求失败')
    }
  }
  const { username, password, ensurement } = toRefs(data)
  return { username, password, ensurement, handleRegister }
}

export default {
  name: 'register',
  components: { Toast },
  setup () {
    const { showToast, toastmessage, toastMessage } = useToastEffect()
    const { username, password, ensurement, handleRegister } = useRegisterEfffect(toastMessage)

    return { handleRegister, username, password, ensurement, showToast, toastmessage }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.wrapper{
    position:absolute;
    top:50%;
    left:0;
    right:0;
    transform: translateY(-50%);
    &__img{
        display: block;
        width: .66rem;
        height:.66rem;
        margin: 0 auto .4rem auto;
    }
    &__input{
        background: #F9F9F9;
        border: .01rem solid rgba(0,0,0,0.10);
        border-radius: .06rem;
        height: .48rem;
        margin:0 .4rem .16rem .4rem;
        box-sizing: border-box;
        padding:0 .16rem;
        &__content{
            border:none;
            outline: none;
            background: none;
            width:100%;
            line-height: .42rem;
            font-size: .16rem;
            color:$content-notice-fontcolor;
        }
    }
    &__register-button{
        background: #0091FF;
        box-shadow: 0 .04rem .08rem 0 rgba(0,145,255,0.32);
        border-radius: .04rem;
        margin:.32rem .4rem .16rem .4rem;
        text-align: center;
        font-size: .16rem;
        color:$bgColor;
        line-height: .48rem;
    }
    &__register-link{
        text-align: center;
        font-size: .16rem;
        color:$content-notice-fontcolor;
    }
}
</style>
