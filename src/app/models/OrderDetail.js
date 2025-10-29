const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const OrderDetailSchema = new Schema({
  _product_id: Number,
  _price: Number,
  _qty: Number,
  _size: String,
  order: { type: mongoose.Schema.Types.Number, ref: 'Order' },
  product: { type: mongoose.Schema.Types.Number, ref: 'Product' }
},
{
  timestamps: true,
  _id: false
});
OrderDetailSchema.plugin(AutoIncrement, { id: 'order_detail' })

module.exports = mongoose.model('OrderDetail', OrderDetailSchema);