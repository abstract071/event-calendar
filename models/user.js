const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  password: { type: String, required: true },
  email: { type: String, required: true },
  events: [{ type: Schema.Types.ObjectId, ref: 'event' }]
});

module.exports = mongoose.model('user', userSchema);