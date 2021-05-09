/**
 * @description Product model
 */
const mongoose = require('../db/db')

const Schema = mongoose.Schema({
  shopId: {
    type: String,
    require: true,
  },  
  tabs: [String],
  name: String,
  imgUrl: String,
  sales: Number,
  price: Number,
  oldPrice: Number
}, {
    timestamps: true
})

const Product = mongoose.model('product', Schema)

module.exports = Product