const router = require('express').Router();
const userController = require('../controller/user.controller');

router.post('/registration', userController.register);
router.post('/login', userController.login);
router.get('/getUser/:id', userController.getUser);
router.put('/updateUser/:id', userController.updateUser);
module.exports = router;