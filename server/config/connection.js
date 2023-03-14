const mongoose = require('mongoose');

const path = require('path');
// create absolute path to .env file in root directory
const dotenvPath = path.join(__dirname, '../.env');
require('dotenv').config({path: dotenvPath})
// console.log(process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected!');
}).catch((err) => {
    console.error('Error connecting to database:', err);
    process.exit(1); // Exit the application with a non-zero code
});

module.exports = mongoose.connection;