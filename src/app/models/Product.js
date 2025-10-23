const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  _name: { type: String, default: '' },
  _desc: { type: String, default: ''},
  _category: { type: String, default: ''},
  _brand: { type: String, default: ''},
  _price: Number,
  _img:  { type: String, default: '' },
  _status: Number,
  _rating: Number
},
{
  timestamps: true,
  _id: false
});
ProductSchema.plugin(AutoIncrement, { id: 'product' })

module.exports = mongoose.model('Product', ProductSchema);