const express = require('express')
const userRouter = express.Router();
const {signin,login} = require('../controllers/userControllers');


userRouter.post('/signin',signin);
userRouter.post('/login',login);


module.exports = userRouter;