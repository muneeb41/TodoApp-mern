const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
  work: {
    type: String,
    minlength: 3, // Corrected for string length validation
    maxlength: 20, // Corrected for string length validation
    unique: true,
    required: true
  },
  date: {
    type: String
  },
  email:{
    type: String,
    required: true
  }
});

exports.TodoModel = mongoose.model('todo', todoSchema); 


