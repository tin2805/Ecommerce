const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const OrderDetailSchema = new Schema({
  _order_id: Number,
  _product_id: Number,
  _price: Number,
  _qty: Number,
  _size: String,
  product: { type: mongoose.Schema.Types.Number, ref: 'Product' }
},
{
  timestamps: true,
  _id: false
});
OrderDetailSchema.plugin(AutoIncrement, { id: 'order_detail' })

module.exports = mongoose.model('OrderDetail', OrderDetailSchema);