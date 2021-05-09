# API设计 

# 一、个人信息接口的设计

## 1、注册

### url
`api/user/register`
### method
`post`
### request body
```js
{
    username: '123912131',
    password: '1213'
}
```
### response body
```js
{
    errno: 0,
    message: 'errno ！==0的话，错误信息'
}
```

## 2、登录

### url
`api/user/login`
### method
`post`
### request body
```js
{   
    username: '123912131',
    password: '1213'
}
```
### response body
```js
{
    errno: 0,
    message: 'errno ！==0的话，错误信息'
}
```


## 3、获取用户信息(暂时不需要)

### url
`api/user/info`
### method
`get`
### request body
无
### response body
```js
{
    errno: 0,
    message: 'errno ！==0的话，错误信息',
    data: {
      username: '****'   
    }
}
```
# 二、地址接口的设计
地址信息的操作之前均需要判断是否登录，即都需要经loginCheck

## 1、创建收货地址
取到request.body和username

### url
`/api/user/address`
### method
`post`
### request body
```js
{
city: '北京',
department: '**小区',
houseNumber: '门牌号',
name: '张三',
phone: '1212123123'
}
```
### response body
```js
{
    errno: 0,
    data:{
        _id: '收货地址的id',
        city: '北京',
        department: '**小区',
        houseNumber: '门牌号',
        name: '张三',
        phone: '1212123123'
        createdAt: Data,
        updateAt: Data
    }
    message: 'errno !== 0 错误信息'
}
```

## 2、获取收货地址列表
从session中取到usernname去数据库中查找即可

### url
`/api/user/address`
### method
`get`
### request body
无
### response body
```js
{
    errno: 0,
    message: 'errno !== 0 错误信息',
    data:[
        {
        _id: '收货地址的id',
        city: '北京',
        department: '**小区',
        houseNumber: '门牌号',
        name: '张三',
        phone: '1212123123'
        createdAt: Data,
        updateAt: Data
    },  {
        _id: '收货地址的id',
        city: '北京',
        department: '**小区',
        houseNumber: '门牌号',
        name: '张三',
        phone: '1212123123'
        createdAt: Data,
        updateAt: Data
    },
    ]

}
```


## 3、获取单个收货地址
取到id去数据库中查找即可

### url
`/api/user/address/:id`(:id是一个动态参数)

示例：`/api/user/address/100` `/api/user/address/101`
### method
`get`
### request body
无
### response body
```js
{
    errno: 0,
    message: 'errno !== 0 错误信息'
    data:{
        _id: '收货地址的id',
        city: '北京',
        department: '**小区',
        houseNumber: '门牌号',
        name: '张三',
        phone: '1212123123'
        createdAt: Data,
        updateAt: Data
    }

}
```

## 4、更新收货地址
取到uesrname和id,request.body 去数据库中更新即可

### url
`/api/user/address/:id`(:id是一个动态参数)

示例：`/api/user/address/100` `/api/user/address/101`
### method
`patch`
### request body
```js
{
    city: '北京',
    department: '**小区',
    houseNumber: '门牌号',
    name: '张三',
    phone: '1212123123'
}
```
### response body
```js
{
    errno: 0,
    message: 'errno !== 0 错误信息'
    // data:{
    //     _id: '收货地址的id',
    //     city: '北京',
    //     department: '**小区',
    //     houseNumber: '门牌号',
    //     name: '张三',
    //     phone: '1212123123'
    //     createdAt: Data,
    //     updateAt: Data
    // }
}
```

# 三、商铺及商品的接口设计
不用进行登录校验

## 1、获取附件店铺列表
直接去数据库中查找即可

### url
`/api/shop/hot-list`

### method
`get`
### request body
无
### response body
```js
{
    errno: 0,
    message: 'errno !== 0 错误信息'
    data: [{
        _id: '店铺id',
        name: '沃尔玛',
        imgUrl: '商店的图片 url',
        sales: 10000, //月售
        expressLimit: 0, //起送价格
        expressPrice: 5, //快递价格
        slogan: 'VIP尊享满89元减4元运费劵'
    },{
        _id: '店铺id',
        name: '沃尔玛',
        imgUrl:'商店的图片 url',
        sales: 10000, //月售
        expressLimit: 0, //起送价格
        expressPrice: 5, //快递价格
        slogan: 'VIP尊享满89元减4元运费劵'
    },
    ]
}

```

 ## 2、获取单个商店信息
取到id后去数据库查找即可
### url
`/api/shop/:id`
### method
`get`
### request body
无
### response body
```js
{
    errno: 0,
    message: 'errno !== 0 错误信息'
    data:{
        _id: '店铺id',
        name: '沃尔玛',
        imgUrl： '商店的图片 url',
        sales: 10000, //月售
        expressLimit: 0, //起送价格
        expressPrice: 5, //快递价格
        slogan: 'VIP尊享满89元减4元运费劵'
    }
}
```

## 3、查询某个商店的商品列表
取到id(商店的id),tab(默认是all)`id=ctx.params.id  tab=ctx.query.tab || all` 然后去数据库中查找即可

### url
`/api/shop/:id/products`

### query 
`tab=all`
示例：
 `/api/shop/:id/products?tab=all` 
`/api/shop/:id/products?tab=seckill`
### method
`get`
### request body
无
### response body
```js
{
    errno: 0,
    message: 'errno !== 0 错误信息'
    products:[{
        _id: '商品的id',
        name: '番茄250g/份'
        imgUrl: '***.png',
        sales: 10,
        price: 33.6,
        oldPrcie: 40.6
    }, {
        _id: '商品的id',
        name: '番茄250g/份'
        imgUrl:'***.png',
        sales: 10,
        price: 33.6,
        oldPrcie: 40.6
    }]
}
```
# 四、订单接口的设计
获取到username和request.body,然后拼接成model，然后再放到数据库中

## 1、创建订单

### url
`/api/order`
### method
`post`
### request body
```js
{
    addressId: '收货地址的id',   //为了可以找到对应地址并复制
    shopId: '商店的id',         //为了找到对应商品
    shopNane: '商店的名称',
    isCanceled: false, //订单是否被取消
    products:[{
        _id: '商品的id',        
        num: 3 //购买数量
    }, {
        _id: '商品的id',     //这里也成了引用
        num: 3 //购买数量
    }]
}
```

```json
{
    "addressId": "608e35791ace6907fc1999db",  
    "shopId": "608e3a56d38e990b68714eb0",  
    "shopNane": "沃尔玛",
    "isCanceled": false, 
    "porducts":[{
        "_id": "608e3cea5efcac03bcddbdbe",        
        "num": 10
    }, {
        "_id": "608e3cea5efcac03bcddbdbf",   
        "num": 12
    }]
}

```
### response body
```js
{
    errno: 0,
    message: 'errno !== 0 错误信息'
    data: {
        _id: '订单的id'
    }
}
```

## 2、查询订单
获取到username然后去数据库查找即可
### url
`/api/order`
### method
`get`
### request body
无

### response body
```js
{
    errno: 0,
    message: 'errno !== 0 错误信息'
    data: {
        _id: '订单的id'
    }
}
```



