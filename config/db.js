const mongoose = require('mongoose');


// Connect to the database
const connectinon = mongoose.createConnection('mongodb://127.0.0.1:27017/todo').on('open', () => {
    console.log('Connected to the database');
}).on('error', (error) => {
    console.warn('Warning', error);
});

module.exports = connectinon;