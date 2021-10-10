const db = require('../config/connection');
const { Entry } = require('../models/Entry');
const User = require('../models/User')
const scribeSeeds = require('./scribeSeeds.js');
const userSeeds = require('./userSeeds');

db.once('open', async () => {
    try {
        await Entry.deleteMany({});
        await User.deleteMany({})
    } catch {
        console.error('DB Delete Error')
    }
    //console.log(scribeSeeds)

    for (const seed of scribeSeeds) {
        console.log(seed);
        try {
            await Entry.create(seed);
        } catch (err) {
            console.error(err)
        }
    }

    for (const user of userSeeds) {
        console.log(user);
        try {
            await User.create(user);
        } catch (err) {
            console.error(err)
        }
    }

    console.log('Database seeded');
    process.exit(0);
})