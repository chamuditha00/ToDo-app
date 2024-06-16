const rentService = require('../service/rent.services');
const short  = require('shortid');

exports.CreateRental = async (req, res,next) => {
    try {
    
        const { userId, carId, startDate, endDate, totalAmount, status, paymentStatus, paymentId, paymentDate, vehicleMeterReading } = req.body;
        const NewpaymentId = short.generate();

        const successRes = await rentService.CreateRent(userId, carId, startDate, endDate, totalAmount, status, paymentStatus, NewpaymentId, paymentDate, vehicleMeterReading);
        res.json({ status: true, message: 'Rent created successfully' });
    } catch (error) {
        next(error);
    }
}

exports.getAllRental = async (req, res, next) => {
    try {
        const successRes = await rentService.getAllRental();
        res.json({ successRes });
    } catch (error) {
        next(error);
    }
}
exports.getRental = async (req, res, next) => {
    try {
        const { userId } = req.body;
       
        const successRes = await rentService.getRental(userId);
        res.json({ successRes });
    } catch (error) {
        next(error);
    }
}
exports.gethistory = async (req, res, next) => {
    try {
        const { userId } = req.body;
      
        const successRes = await rentService.gethistory(userId);
        res.json({ successRes });
    } catch (error) {
        next(error);
    }

}
exports.endRent = async (req,res,next)=>{
    try{
        const { userId , carId , endDate , endVehicleMeterReading, discount , extraCharges } = req.body;
        const successRes = await rentService.endRent(userId, carId, endDate, endVehicleMeterReading , discount, extraCharges);
        res.json({status:true, message: 'Rent ended successfully', successRes});

    }catch(e){
        next(e)

    }
}