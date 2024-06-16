const RentModel = require('../model/rent.model');
const CarModel = require('../model/car.model');
const UserModel = require('../model/user.model');
const completedRentModel = require('../model/completedRental.model');

function getCurrentFormattedDate() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(now.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}



class rentServices{
    
    
    static async CreateRent(userId, carId, startDate, endDate, totalAmount, status, paymentStatus, paymentId, paymentDate, vehicleMeterReading){
        const existRent = await RentModel.findOne({ paymentId});
        if(existRent){
            throw new Error('Rent already exist');
        }else{
        try{
            const user = await UserModel.findOne({_id:userId});
            const car = await CarModel.findOne({_id:carId});
            const vehicleMeterReading = car.vehicleMeterReading;
            const numOfRentals = user.numOfRentals + 1;
            const activeRentals = user.activeRentals + 1;
            await UserModel.findOneAndUpdate({_id:userId}, {numOfRentals, activeRentals});
            const createRent = new RentModel({userId, carId, startDate, endDate, totalAmount, status, paymentStatus, paymentId, paymentDate, vehicleMeterReading});
            return await createRent.save();
        }catch(error){
            throw error;
        }
    }
    }
    static async getAllRental(){
        try{
            const getRentdata = await RentModel.find();
            return getRentdata;
        }catch(error){
            throw error;
        }
    }

    static async getRental(userId){
        try{
            console.log(userId)
            const getRentdata = await RentModel.find({userId});
            return getRentdata;
        }catch(error){
            throw error;
        }
    }
    static async gethistory(userId){
        try{
            console.log(userId)
            const getRentdata = await completedRentModel.find({userId});
            return getRentdata;
        }catch(error){
            throw error;
        }
    }
    static async endRent(userId, carId, endDate, endVehicleMeterReading, discount, extraCharges){

        try{
            const rentExist = await RentModel.findOne({userId, carId});
                if(!rentExist){
                    throw new Error('Rent not found');
                }else{
                const user = await UserModel.findOne({_id:userId});
                const car = await CarModel.findOne({_id:carId });
                
                const rentPerDay = car.RentPerDay;
                
    
                const start = rentExist.startDate.toISOString().split('T')[0];
                const end = endDate;
                
    
                const startDate = new Date(start);
                const enddate = new Date(end);
                const diff = Math.abs(enddate - startDate);
                const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
                const vehicleMeterReading = rentExist.vehicleMeterReading;
                const diffMeter = endVehicleMeterReading - vehicleMeterReading;
                const extraKm = diffMeter - (diffDays * car.kmPerDay);
                const Amount = diffDays * rentPerDay;
                const extraAmount = extraKm * car.chargePerExtraKm;
                const TotalAmount = Amount + extraAmount - discount;
                const paymentDate = getCurrentFormattedDate();
                const status = 'completed';
                const paymentStatus = 'paid';
                const totalAmount = TotalAmount;
                const paymentId = rentExist.paymentId;
                const totalEarning = user.totalEarning + TotalAmount + extraCharges;
                const reduceRent = user.activeRentals - 1;
                const fee = totalEarning * 0.1;
                await UserModel.findOneAndUpdate({_id:userId}, {totalEarning, activeRentals:reduceRent, fee});
                await CarModel.findOneAndUpdate({_id:carId}, {vehicleMeterReading:endVehicleMeterReading});
                await RentModel.findOneAndDelete({userId, carId}, {endDate, endVehicleMeterReading,totalAmount,status,paymentDate}, {new:true});
                const passData = new completedRentModel({userId, carId, vehicleMeterReading, endVehicleMeterReading, startDate, endDate, totalAmount, status, paymentStatus, paymentId, paymentDate, extraCharges});
                await passData.save();
                return passData;
            }
        
            }catch(error){
            throw error;
        }
    }
}
    


module.exports = rentServices;