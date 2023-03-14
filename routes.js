const { Router } = require("express");
const dbMethod = require('./controllers');
const { auth } = require("./middleware/Auth");

const router=Router();


router.get('/users',auth, dbMethod.getUsers)
router.get('/users/:id', dbMethod.getUserById)
router.post('/users', dbMethod.createUser)
router.put('/users/:id', dbMethod.updateUser)
router.delete('/users/:id', dbMethod.deleteUser)

module.exports=router