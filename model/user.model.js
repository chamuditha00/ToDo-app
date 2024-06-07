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
    required: true,
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