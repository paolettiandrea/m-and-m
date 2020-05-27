const fs = require('fs');
const express = require('express')
const router = express.Router();

router.get('/', function (req, res, next) {
    fs.readFile("data/missions.json", 'utf-8', ((err, data) => {
        res.json(JSON.parse(data).availableMissions)
    }));
})

router.get('/new', function (req, res, next) {
    res.send("test string");
})
module.exports = router