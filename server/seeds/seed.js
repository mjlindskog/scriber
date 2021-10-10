const db = require('../config/connection');
const { Entry } = require('../models/Entry');
const scribeSeeds = require('./scribeSeeds.js');

db.once('open', async () => {
    try {
        await Entry.deleteMany({});
    } catch {
        console.error('DB Delete Error')
    }
    //console.log(scribeSeeds)

    for (const el of scribeSeeds) {
        console.log(el);
        try {
            await Entry.create(el);
        } catch {
            console.error(`Error at ${seed}`)
        }
    }

    console.log('Database seeded');
    process.exit(0);
})