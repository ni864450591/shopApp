# 数据库中数据模型设计

列举各个数据模型的示例，写明属性

## 用户

```js
{
    _id: '用户id'
    username: '1211141',
    password: '12312'
}
```
## 地址
```js
{
    _id: '地址id'
    username: '1211141', //和用户产生关联
    city: '北京',
    department: '**小区',
    houseNumber: '门牌号',
    name: '张三',
    phone: '1212123123'
}
```
## 商店
```js
{
     _id: '店铺id',
     name: '沃尔玛',
     imgUrl: '商店的图片 url',
     sales: 10000, //月售
     expressLimit: 0, //起送价格
     expressPrice: 5, //快递价格
     slogan: 'VIP尊享满89元减4元运费劵'
}
```

## 商品
```js
{
    _id: '商品的id',
    tabs: ['all', 'seckill', 'fruit']  //左侧tab类型
    shopId: '对应商品的id',
    name: '番茄250g/份'
    imgUrl:'***.png',
    sales: 10,
    price: 33.6,
    oldPrcie: 40.6
}
```
## 订单

```js
{
    username: 'zhangsan',
    _id: '',
    addressId:  '地址的id',
    shopId: '商店的id',        
    shopName: '商店的名称',
    isCanceled: false, //订单是否被取消
    address:{
      username:'zhangsan',
      city: '北京市',
      department: 'yy小区A',
      housenumber: '303A',
      name: '张三',
      phone: '12123128888'
    },
    porducts:[{
     product:{
      name: '葡萄',
      imgUrl: '/images/poduct/grape.jpg',
      sales: 100,
      price: 33,
      oldPrice: 36,
      tabs:['all','seckill','fruit']
     },
     orderSales:3
    }]
}
```