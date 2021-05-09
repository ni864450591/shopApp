# jingdongdemo
一个购物app 的demo,全栈开发的前端部分

## 1、components （公共组件） 
(1)`Docker`(底部导航栏)

(2)`shopInfo`(商店介绍)

(3)`Toast`(弹窗)

## 2、effects (购物车的公共逻辑)
`return { cartList, changeCartItem, productList, shopName, caculations }`

(1)`cartList` proxy

(2)`changeCartItem` 新增/新建购物车的商品

(3)`porductList` 获取购物车数量不0的商品列表

(4)`shopName`商铺名

(5)`caculations`{ total, prcie, allcheck }

## 3、router (路由)

(1)动态路由

`component: () => import(/* webpackChunkName: "Login" */ '../views/login/Login'),`

(2)路由守卫 登录后不能再回到注册页面和登录页面，跳回到首页
```js
beforeEnter (to, from, next) {
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    }
```
(3)没有登录进不去别的页面，只能在登录页面和注册页面停留
```js
router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage;
  ((isLogin || to.name === 'Register') || to.name === 'Login') ? next() : next({ name: 'Login' })
})

```
## 3、store (存放购物车数据的仓库)
(1)购物车数据结构(store) 

`cartList：{ shopId: { shopName: '' , productList: { prodcutId: {} } } }`

(2) 同步事件的操作( mutations)

`changeCartItem   changeCartItemCheck  changeShopName  clearCartProduct  setCartIetmChecked`

(3)购物车的数据存到localStorage

`setLocalCartList  getSeesionCartList`

## 4、style (css 样式)

(1)`base.css`:基础样式  

这是为了屏幕的适配
```css
html{
    font-size:100px;
}
```
(2)`iconfont.css`:图标字体

(3)`mixins.css`: css的公共逻辑：单行文本省略

(4)`viriables.css`: css中出现多次的颜色

## 5、utils(常用的公共逻辑)
`post  get patch`

# view(各个页面)
页面的布局(template和scss)，这里主要讲逻辑功能
## 1、登录页面(login)

(1)数据：`username password toastmessage`

(2)逻辑：按下登录按钮，检查输入是否合法，合法则将username和password发送后端进行登录校验，成功返回将登录标志置true,并跳转到首页，这里弹窗的显示与否和显示内容均由弹窗组件实现，点击去注册跳转到注册页面

## 2、注册页面(register)

(1)数据：`username password ensurement toastmessage`

(2)逻辑：按下注册按钮，检查输入是否合法，合法再将username和password发送到后端进行注册校验，功能则跳转到登录页面
这里也可以跳转到登录页面

## 3、首页(home)

(1)数据：商品的信息

(2)逻辑：从后端请求商品数据，从这里可以进入到商铺页面

## 4、商铺(shop)

(1)数据：商铺的信息，特别是商品的id，左边的tab栏，右边商品的信息，下方购物车里的信息，总数和总价，及全选

(2)逻辑

*1：从url中取到商铺的id和获取到tab后去后端请求数据，然后显示数据

*2：+和-的功能：从购物车中添加商品或删减商品，以及修改商品名称

*3：总计,选中，全选,清空，+和-,以及上下的联动

*4：购物车的显示，遮罩层的显示

*5：跳转到确认订单页面


## 5、确认订单页面(oderConfigmation)

(1)数据：购物车里商品的信息,商铺id，商品总价和总数

(2)逻辑：从购物车中获取需要的信息并计算出总价和总数，显示，然后去结算按钮的功能，弹窗的出现与否，遮罩层显示与否，取消按钮的功能，确认按钮的功能，按下之后会跳到订单页面，只是状态不同，然后会向后端发送订单信息

## 6、订单页面(orderList)

(1)数据：订单的信息

(2)请求订单数据后显示

## 7、购物车页面(cartlist)

(1)数据：购物车的商品和商品的信息

(2)逻辑：获取购物车里的信息并显示

## 8、个人页面(person)

(1)数据：(暂时没设置)

(2)逻辑：(暂时没有)，主要是作为地址页的入口


## 9、地址页面(address)

(1)数据：个人地址的信息

(2)逻辑：向后端请求地址数据后显示

## 10、地址编辑/新建页面(address)

(1)数据：地址信息

(2)逻辑

*1 根据是否传id来判断是新建还是编辑

*2 新建用户输入信息，获取信息，发送后端，存入数据库,并返回管理地址页面

*3 编辑用户信息，或取数据，发送后端，修改数据，存入数据库
