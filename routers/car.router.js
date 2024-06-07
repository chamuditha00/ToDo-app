const router = require('express').Router();
const carController = require('../controller/car.controller');

router.post('/add',carController.createCar);

module.exports = router;