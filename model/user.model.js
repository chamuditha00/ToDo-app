const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const db = require('../config/db');

const { Schema } = mongoose;

const userSchema = new Schema({
email: {
    type: String,
    required: true,
    unique: true,
},
password: {
    type: String,
    required: true,

},
name: {
    type: String,
    required: true,
},
phone: {
    type: Number,
    unique: true,
    required: true,
},
profileImage: {
    type: String,
    default:null
},
activeRentals: {
    type: Number,
    default: 0

},
numOfRentals: {
    type: Number,
    default: 0
},
numOfVehicle: {
    type: Number,
    default: 0
},

location: {
    type: String,
    default:""
},
fee:{
    type: Number,
    default: 0

},
totalEarning: {
    type: Number,
    default: 0
},



});
userSchema.pre('save', async function () {
    try{

        var user = this;
        const salt = await bcryptjs.genSalt(10);
        const hashpass = await bcryptjs.hash(user.password, salt);
        user.password = hashpass;
    
    }catch(error){
        throw error;
    }
});
userSchema.methods.comparePassword = async function (userPassword) {
    try{
        const isMatch = await bcryptjs.compare(userPassword, this.password);
        return isMatch;
    }catch(error){
        throw error;
    }

}

const UserModel = db.model('User', userSchema);



module.exports = UserModel; 