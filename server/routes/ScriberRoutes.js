const router = require('express').Router();
const Scriber = require("../models/ScriberModel");

router.post("/api/scriberdb", ({body}, res) => {
    Scriber.create(body)
    .then(dbScriber => {
        res.json(dbScriber);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.get("/api/scriberdb ", (req, res) => {
    Scriber.find({})
    .sort({date: -1 })
    .then(dbScriber => {
        res.json(dbScriber);
    })
    .catch(err => {
        res.status(400).json(err);
    });
} );

module.exports = router;
