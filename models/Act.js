// models/Act.js
// models/Act.js
const mongoose = require('mongoose');

const actSchema = new mongoose.Schema({
  category:{
    type: String,
    required: true,
  },


  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 1000,

  },
    
  identifier:{
    type: String,
    required: true,
    unique: true,

  },
});

const Act = mongoose.model('Act', actSchema);

module.exports = Act;
