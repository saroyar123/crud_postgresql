const { Router } = require("express");
const dbMethod = require('./controllers');
const { auth } = require("./middleware/Auth");

const router=Router();


router.get('/users', dbMethod.getUsers)
router.get('/users/:id',auth, dbMethod.getUserById)
router.post('/users', dbMethod.createUser)
router.put('/users/:id',auth, dbMethod.updateUser)
router.delete('/users/:id',auth, dbMethod.deleteUser)

module.exports=router