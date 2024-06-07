const CarService = require('../service/car.services');

exports.createCar = async (req, res,next) => {
    try {
        const { userId, numberPlate, VehicleType,
            RentPerDay, DepositAmount, chargePerExtraKm, vehicleMeterReading, vehicleImage, kmPerDay } = req.body;
            console.log(userId);
            console.log(numberPlate);
            console.log(VehicleType);
            console.log(RentPerDay);
            console.log(DepositAmount);
            console.log(chargePerExtraKm);
            console.log(vehicleMeterReading);
            console.log(vehicleImage);
            console.log(kmPerDay);

        const successRes = await CarService.createCar(userId, numberPlate, VehicleType,
            RentPerDay, DepositAmount, chargePerExtraKm, vehicleMeterReading, vehicleImage, kmPerDay);
        res.json({status:true, message: 'Car created successfully'});
    } catch (error) {
        next(error);
    }
}