const db = require('../config/db');
const mongoose = require('mongoose');
const UserModel = require('./user.model');

const {Schema} = mongoose;

const carSchema = new Schema({

    userId:{
        type: Schema.Types.ObjectId,
        ref: UserModel.modelName,
        required: true
    },
    numberPlate: {
        type: String,
        required: true,
        unique: true
    },
    VehicleType: {
        type: String,
        required: true
    },
    RentPerDay: {
        type: Number,
        required: true
    },
    DepositAmount: {
        type: Number,
        required: true
    },
    Available: {
        type: Boolean,
        default: true
    },
    chargePerExtraKm: {
        type: Number,
        required: true
    },
    vehicleMeterReading: {
        type: Number,
        required: true
    },
    vehicleImage: {
        type: String,
        required: true
    },
    kmPerDay: {
        type: Number,
        required: true
    },
});

const CarModel = db.model('Car', carSchema);
module.exports = CarModel;