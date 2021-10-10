const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/scriber', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log('Database connected!'));

module.exports = mongoose.connection;