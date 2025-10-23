const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  _user_id: Number,
  _price: Number,
  _status: String,
  _type: String
},
{
  timestamps: true,
  _id: false
});
OrderSchema.plugin(AutoIncrement, { id: 'order' })

module.exports = mongoose.model('Order', OrderSchema);