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
        } catch {
            console.error(`Error at ${seed}`)
        }
    }

    for (const user of userSeeds) {
        console.log(user);
        try {
            await User.create(user);
        } catch {
            console.error(`Error at ${user}`)
        }
    }

    console.log('Database seeded');
    process.exit(0);
})