const router = require('express').Router();
const rentController = require('../controller/rent.controller');


router.post('/addRent', rentController.CreateRental);
router.get('/getAllRental', rentController.getAllRental);
router.get('/getRental', rentController.getRental);
router.put('/endRent', rentController.endRent);
router.get('/gethistory', rentController.gethistory);
module.exports = router;