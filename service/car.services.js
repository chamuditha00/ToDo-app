const CarModel = require('../model/car.model');
const UserModel = require('../model/user.model');

class CarService {
    static async createCar(userId, numberPlate, VehicleType,
        RentPerDay, DepositAmount, chargePerExtraKm, vehicleMeterReading, vehicleImage, kmPerDay) {  
            const carExist = await CarModel.findOne({numberPlate});
            if(carExist){
                throw new Error('Car already exist');
            }else{
        try{
            const user = await UserModel.findOne({_id: userId});
            const numOfVehicle = user.numOfVehicle+1;
            await UserModel.findOneAndUpdate({_id:userId}, {numOfVehicle});
            

            const createCar = new CarModel({ userId, numberPlate, VehicleType,
                RentPerDay, DepositAmount, chargePerExtraKm, vehicleMeterReading, vehicleImage, kmPerDay});
            return await createCar.save();
        }
        catch(error){
            throw error;
        }
    }
    

}
static async getCar(userId) {
    try{
        
        const getCarsdata = await CarModel.find({userId}); 
        return getCarsdata;
    }catch(error){
        throw error;
    }
}
static async getAllCars() {
    
    try{
        
        const getCarsdata = await CarModel.find(); ;
        return getCarsdata;
    }catch(error){
        throw error;
    }
    
}
static async updateCardata(id, data){
    try{

        const carExist = await CarModel.findOne({_id:id});
        if(!carExist){
            throw new Error('Car not found');
        }
        const updateCar = await CarModel.findByIdAndUpdate(id,data,{new:true});
        return updateCar;

    }catch(error){
        throw error;
    }
}
static async deleteCardata(id){
    try{
        const carExist = await CarModel.findOne({_id:id});
        if(!carExist){
            throw new Error('Car not found');
        }
        const deleteCar = await CarModel.findByIdAndDelete(id);
        return deleteCar;
    }catch(error){
        throw error;
    }
}

}

module.exports = CarService;