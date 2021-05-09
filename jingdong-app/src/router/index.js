import { createRouter, createWebHistory } from 'vue-router'
//  学完多去看看文档 https://router.vuejs.org/zh/
//  都采用了动态组件的引入方式
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/home/Home')
  }, {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/login/Login'),
    //  这里是登录后不能在进入登录页面，只能跳回首页 路由守卫
    //  登录了就不能再回到登录页面了,没有登录你能进行你的下一步操作，也就是进入登录页面
    beforeEnter (to, from, next) {
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    }
  }, {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "Register" */ '../views/register/Register'),
    //  这里也是，登录了就不能再回到注册页面了
    beforeEnter (to, from, next) {
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    }
  }, {
    //  这里是为了能识别id，方便路由获取id,也就是根据不同商铺展示商品信息
    path: '/shop/:id',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "Shop" */ '../views/shop/Shop')
  }, {
    path: '/cartList',
    name: 'CartList',
    component: () => import(/* webpackChunkName: "CartList" */ '../views/cartList/CartList')
  }, {
    //  这里同上，根据不同商铺的订单展示不同的订单信息
    path: '/orderConfigmation/:id',
    name: 'OrderConfigmation',
    component: () => import(/* webpackChunkName: "OrderConfigmation" */ '../views/orderConfigmation/OrderConfigmation')
  }, {
    path: '/orderList',
    name: 'OrderList',
    component: () => import(/* webpackChunkName: "OrderList" */ '../views/orderList/OrderList')
  }, {
    path: '/person',
    name: 'Person',
    component: () => import(/* webpackChunkName: "Person" */ '../views/person/Person')
  }, {
    path: '/manageAddress',
    name: 'ManageAddress',
    component: () => import(/* webpackChunkName: "ManageAddress" */ '../views/address/ManageAddress')
  }, {
    path: '/updateAddress',
    name: 'UpdateAddress',
    component: () => import(/* webpackChunkName: "UpdateAddress" */ '../views/address/UpdateAddress')
  }
]

// 这是创建路由的一个配置
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
//  这里是判断没登录时只能进入登录页面，而且得停留在登录页面
//  没有登录许可只能在注册页面和登录页面逗留
//  beforeEach是在进入每个页面之前都会执行的函数
router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage;
  ((isLogin || to.name === 'Register') || to.name === 'Login') ? next() : next({ name: 'Login' })
})

//  访问有两种方式
//  1、this.$router this.$route
//  2、import { useRoute, useRouter }  from 'vue-router'
//  const route = useRoute()  const router = useRouter()

export default router
