const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: { type: String, required: true },
  start: { type: Number, required: true },
  duration: { type: Number, required: true },
  cevc: { type: Number, required: true, default: 1 },
  hindex: { type: Number, required: true, default: 0 },
  user: { type: Schema.Types.ObjectId, ref: 'user' }
});

module.exports = mongoose.model('event', eventSchema);