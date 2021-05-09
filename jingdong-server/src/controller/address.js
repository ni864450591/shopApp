/**
 * @description address controller
 */

const Address = require('../models/Address')

/**
 * 创建新地址
 * @param {String} username 用户名
 * @param {String} data  地址的详细信息
 * 
 */
async function createAddress(username, data) {
  const newAddress = await Address.create({
    username,
    ...data
  })
  return newAddress
}

/**
 * 获取用户地址列表
 * @param {String} username 用户名
 */
async function getAddressList(username){
    const addressList = await Address.find({ username }).sort({ _id:-1 })
    return addressList
}

/**
 * 根据id获取单个收货地址
 * @param {String} id id
 */
async function getAddressById(id) {
  const address = await Address.findById(id)
  return address
}

/**
 * 根据id更新地址信息
 * @param {String} data  更新的数据
 * @param {String} id       地址的id
 * @param {String} username 用户名
 */
async function updateAddress(data, id, username) {
    const newAddress = await Address.findOneAndUpdate(
      { username, _id: id},
      { username, ...data },
      { new: true } //返回一个更新后的数据
    )
    return newAddress
}
module.exports = {
    createAddress, getAddressList, getAddressById, updateAddress
}