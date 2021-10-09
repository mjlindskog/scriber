const db = require('../config/connection');
const {Entry} = require('../models/ScriberModel');
const scribeSeeds = require('./scribeSeeds.js');

db.once('open', async () => {
    await ScriberModel.deleteMany({});
    await ScriberModel.create(scribeSeeds);


    console.log('Database seeded');
    process.exit(0);
})