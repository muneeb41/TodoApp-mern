
const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
    name: {
      type : String,
      minlength :3,
      required : true
    },
    email: {
      type:String,
      required : true,
      unique: true
    },
    password: {
      type: String,
      minlength: 4,
      required :true
    },
    token: {
      type: String,
      required:true
    }
  })
  
  exports.UserModel = mongoose.model('user',userSchema);
  