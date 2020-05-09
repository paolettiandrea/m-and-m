const fs = require('fs');
const express = require('express')
const router = express.Router();

router.get('/', function (req, res, next) {
    fs.readFile("data/missions.json", 'utf-8', ((err, data) => {
        console.log();
        res.json(JSON.parse(data).availableMissions)
    }));
})

module.exports = router