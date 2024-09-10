const express = require('express')
const router = express.Router()
const {getTodo,addTodo,deleteTodo,editTodo} = require('../controllers/controllers.js')



router.get('/',getTodo);
router.post('/',addTodo)
router.delete('/',deleteTodo)
router.put("/",editTodo)


module.exports = router;