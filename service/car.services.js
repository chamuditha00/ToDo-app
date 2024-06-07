const CarModel = require('../model/car.model');

class CarService {
    static async createCar(userId, numberPlate, VehicleType,
        RentPerDay, DepositAmount, chargePerExtraKm, vehicleMeterReading, vehicleImage, kmPerDay) {  
        try{
            const createCar = new CarModel({ userId, numberPlate, VehicleType,
                RentPerDay, DepositAmount, chargePerExtraKm, vehicleMeterReading, vehicleImage, kmPerDay});
            return await createCar.save();
        }
        catch(error){
            throw error;
        }

}
}

module.exports = CarService;