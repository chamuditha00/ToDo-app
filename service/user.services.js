const UserModel = require('../model/user.model');
const jwt = require('jsonwebtoken');
class UserService {
    static async registerUser(email, password, name, phone, profileImage, numOfRentals, numOfVehicle) {
        try{
            const createUser = new UserModel({ email, password, name, phone, profileImage, numOfRentals, numOfVehicle});
            
            return await createUser.save();
        }
        catch(error){
            throw error;
        }
    }

    static async checkUser(email, password) {
        try{
            return await UserModel.findOne({ email});
        }
        catch(error){
            throw error;
        }
    }
    static async generateToken(tokenData,secretKey,jwt_expire) {
        return jwt.sign(tokenData, secretKey, { expiresIn: jwt_expire });
    }

    static async getUserdata(userId) {
        try{
            const userExist = await UserModel.findOne({_id:userId});
            
            if(!userExist){
                throw new Error('User not found');
            }
            return userExist;
        }
        catch(error){}
    }
    static async updateUserdata(id, data) {
        try{
            const userExist = await UserModel.findOne({_id:id});
            if(!userExist){
                throw new Error('User not found');
            }
            const updateUser = await UserModel.findByIdAndUpdate(id,data,{new:true});
            return updateUser;
        }
        catch(error){
            throw error;
        }
    }
}
module.exports = UserService;