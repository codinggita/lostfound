const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
    enum: ["lost", "found"],
  },
  location: {
    type: String,
  },
  image: {
    type: String,
  },
  college: {
    type: String,
  },
  date: {
    type: Date,
  },
  category: {
    type: String,
  },
  brand: {
    type: String,
  },
  color: {
    type: String,
  },
  quantity: {
    type: String,
  },
  dateAndTime: {
    type: String,
  },
  lastSeenPlace: {
    type: String,
  },
  ownerName: {
    type: String,
  },
  status: {
    type: String,
    default: "open"
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Item', itemSchema);
