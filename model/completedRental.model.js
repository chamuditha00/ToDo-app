const db = require('../config/db');
const mongoose = require('mongoose');
const UserModel = require('./user.model');
const CarModel = require('./car.model');

const {Schema} = mongoose;

const compeletedtRentSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: UserModel.modelName,
        required: true
    },
    carId:{
        type: Schema.Types.ObjectId,
        ref: CarModel.modelName,
        required: true
    },
    vehicleMeterReading:{
        type: Number,
        required: true,
        default: 0
    },

    endVehicleMeterReading:{
        type:Number,

    },

    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        
    },
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'completed'
    },
    paymentStatus: {
        type: String,
        default: 'pending'
    },
    paymentId: {
        type: String,
        default: null,
        unique: true
    },
    paymentDate: {
        type: Date,
    },
    extraCharges:{
        type: Number,
    }
});

const CompletedRentModel = db.model('CompletedRent', compeletedtRentSchema);
module.exports = CompletedRentModel;