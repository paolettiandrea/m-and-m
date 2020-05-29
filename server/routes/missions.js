const fs = require('fs');
const express = require('express')
const router = express.Router();
const database = require('../data/dbController.js')

router.get('/', function (req, res, next) {
    fs.readFile("data/missions.json", 'utf-8', ((err, data) => {
        res.json(JSON.parse(data).availableMissions)
    }));
})

router.get('/new', function (req, res, next) {
    database.newMission().then( (mission) => {
        res.send(mission);
    })
})

router.get('/heads', function (req, res, next) {
    database.getMissionHeadsList().then( function (missionHeads) {
        res.json(missionHeads);
    })
})

router.delete('/delete/:uid', function (req, res, next) {
    console.log(req.params.uid);
    database.deleteMission(req.params.uid).then( (contentId) => {
        res.json({ deletedContentId: contentId })
        console.log("Mission deleted");
    })
})

module.exports = router