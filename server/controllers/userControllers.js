const { connection } = require("../config/connection");
const {UserModel} = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.signin = async (req,res)=>{
    try {
        // Check if the user with the email already exists
    const existingUser = await UserModel.findOne({ email: req.body.email });

    if (existingUser) {
      // If the user already exists, return a response for re-signin
      return res.status(200).json({
        message: "User already signed in",
        token: existingUser.token, // Returning existing token
      });
    }
        const user = new UserModel(req.body);
        var token = jwt.sign({email : user.email},process.env.SECUREKEY);
        user.token = token;
        const passwordHash = bcrypt.hashSync(user.password, 5);
        user.password = passwordHash;
        const result = await user.save();
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
    }
}

exports.login = async (req, res) => {
    try {
      const user = await UserModel.findOne({ email: req.body.email });
  
      if (!user) {
        return res.status(400).json({ message: 'User does not exist' }); // Return after sending response
      }
  
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(400).json({ message: 'Incorrect password' }); // Return after sending response
      }
  
      const token = jwt.sign({ email: user.email }, process.env.SECUREKEY);
      user.token = token;
  
      const result = await user.save();
      const response = {
        name: result.name,
        email: result.email,
        token: result.token,
      };
      
      return res.status(201).json(response); // Return after sending response
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal server error' }); // Handle errors appropriately
    }
  };
  