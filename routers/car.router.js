const router = require('express').Router();
const carController = require('../controller/car.controller');
const { route } = require('./user.router');

router.post('/add',carController.createCar);
router.get('/getCar',carController.getCar);
router.get('/getAllCars',carController.getAllCars);
router.put('/updateCar/:id',carController.updateCar);
router.delete('/deleteCar/:id',carController.deleteCar);


module.exports = router;