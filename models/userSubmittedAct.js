// models/UserSubmittedAct.js
const mongoose = require('mongoose');

const userSubmittedActSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
});

const UserSubmittedAct = mongoose.model('UserSubmittedAct', userSubmittedActSchema);

module.exports = UserSubmittedAct;
