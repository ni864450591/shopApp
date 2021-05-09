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
              v-model="password"
              autocomplete="new-password"
            />
        </div>
        <div class="wrapper__login-button" @click="handleLogin">登陆</div>
        <router-link :to="{path: '/register'}">
          <div class="wrapper__login-link">立即注册</div>
        </router-link>
        <!-- 弹窗的显示 -->
        <Toast v-if = 'showToast' :message = 'toastmessage'/>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast'

// 这里抽离登录的逻辑和数据
//  逻辑思路
//  1、要准备好username password接收用户的输入，并进行双向数据绑定 v-model
//  2、当用户按下登录按钮要处理的事情，判断用户的输入是否合法，合法再进行后端发送
// (去看后端的API要求和返回的数据) 后端查询是否存在这个用户且密码是否正确
//  3、返回一个可否登录的标志
//  4、若登录失败则弹出登录失败弹窗
//  5、若登录成功则进入首页
const useLoginEfffect = (toastMessage) => {
  const router = useRouter()
  const data = reactive({
    username: '',
    password: ''
  })
  const handleLogin = async () => {
    try {
      const { username, password } = data
      //  如果用户没输入账号和密码就弹出
      if (username === '') {
        toastMessage('请输入用户名')
        return
      }
      if (password === '') {
        toastMessage('请输入密码')
        return
      }
      //  这里又跳到了后端
      const result = await post('api/user/login', {
        username,
        password
      })
      //  正确后指定跳到首页，没有就弹出登录失败
      if (result.errno === 0) {
        localStorage.isLogin = true
        router.push({ name: 'Home' })
      } else {
        toastMessage('登录失败')
      }
    } catch (e) {
      toastMessage('请求失败')
    }
  }
  const { username, password } = toRefs(data)
  return { username, password, handleLogin }
}

export default {
  name: 'Login',
  components: { Toast },

  // setup大多时候就是告诉你执行的流程
  setup () {
    const { showToast, toastmessage, toastMessage } = useToastEffect()
    const { username, password, handleLogin } = useLoginEfffect(toastMessage)

    return { handleLogin, username, password, showToast, toastmessage }
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
    &__login-button{
        background:$btn-color;
        box-shadow: 0 .04rem .08rem 0 rgba(0,145,255,0.32);
        border-radius: .04rem;
        margin:.32rem .4rem .16rem .4rem;
        text-align: center;
        font-size: .16rem;
        color: $bgColor;
        line-height: .48rem;
    }
    &__login-link{
        text-align: center;
        font-size: .16rem;
        color:$content-notice-fontcolor;
    }
}
</style>
