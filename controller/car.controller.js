const CarService = require('../service/car.services');

//add vehicle data
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
//get vehicle data according to user id
exports.getCar = async (req, res,next) => {
    try {

        const {userId} = req.body;
        console.log(userId);

        const successRes = await CarService.getCar(userId);
        res.json({successRes});
    } catch (error) {
        next(error);
    }

}
//get all vehicle data

exports.getAllCars = async (req, res,next) => {
    try {
        const successRes = await CarService.getAllCars();
        res.json({successRes});
    } catch (error) {
        next(error);
    }


}
//update vehicle data
exports.updateCar = async (req, res,next) => {
    try{
        const id = req.params.id;
        const successRes = await CarService.updateCardata(id,req.body);
        res.status(200).json({status:true, message: 'Car updated successfully', successRes});


    }catch(error){
        next(error);
    }
}

//delete vehicle data

    exports.deleteCar = async (req, res,next) => {
        try{
            const id = req.params.id;
            const successRes = await CarService.deleteCardata(id);
            res.status(200).json({status:true, message: 'Car deleted successfully', successRes});
    
    
        }catch(error){
            next(error);
        }
    
    }



