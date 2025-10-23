const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullname: { type: String, default: '' },
  username: { type: String, default: '', unique: true},
  age: Number,
  date: Date,
  email: { type: String, default: '', unique: true, require: true },
  password: { type: String, default: '', require },
  role: { type: String, default: '' },
},
{
  timestamps: true,
  _id: false
});
UserSchema.plugin(AutoIncrement, { id: 'user' })

module.exports = mongoose.model('User', UserSchema);