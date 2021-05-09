import axios from 'axios'

// 因为这里都有了baseURL，所以可以创建一个axios实例，传入一些公共参数 地址，超时时间 然后引用这个实例
const instance = axios.create({
  // baseURL: 'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd',
  baseURL: 'http://localhost:3000',
  withCredentials: true, // 允许跨域传递Cookie
  timeout: 10000
})
//  这是封装一下请求函数，返回一个pormise对象，顺便配置一些参数 最后返回的是response里data
//  发送数据，发送用户名和密码之类的，然后会返回一些数据
export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.post(url, data, {
      //  后端需要接收这么一个参数
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}
//  请求数据，这时就不需要携带数据，但是要携带参数
export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params }).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}

//  更新数据
export const patch = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.patch(url, params).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}
