const mongoose = require('mongoose');

const favoriteWordSchema = new mongoose.Schema({
  term: {
    type: String,
    required: true
  },
  definitions: {
    type: Array,
    required: true
  },
  difficulty: {
    type: Number,
    required: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
})

module.exports = mongoose.model('favoriteWord', favoriteWordSchema);