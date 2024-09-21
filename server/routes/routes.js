const express = require('express')
const {auth} = require('../middleware/auth.js');
const router = express.Router()
const {getTodo,addTodo,deleteTodo,editTodo} = require('../controllers/controllers.js')



router.get('/',auth,getTodo);
router.post('/',auth,addTodo)
router.delete('/',auth,deleteTodo)
router.put("/",auth,editTodo)


module.exports = router;