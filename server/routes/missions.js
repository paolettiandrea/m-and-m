const fs = require('fs');
const express = require('express')
const path = require('path')
const router = express.Router();
const database = require(path.join(__dirname, '../js/altDbController.js'))
const resources = require(path.join(__dirname, '../js/resController.js'))

router.get('/', function (req, res, next) {
    // fs.readFile("../data/missions.json", 'utf-8', ((err, data) => {
    //     res.json(JSON.parse(data).availableMissions)
    // }));
    res.send("test");
})

// Creates a new missioncollapse
router.get('/new', function (req, res, next) {
    database.newMission().then( (mission) => {
        res.send(mission);
        resources.addResourceDir(mission._id);
    })
})

router.get('/heads', function (req, res, next) {
    // database.getMissionHeadsList().then( function (missionHeads) {
    //     res.json(missionHeads);
    // })
    res.send("asddsa");
})

router.get('/content/:uid', function (req, res, next) {
    database.getMissionContent(req.params.uid).then( function (missionContent) {
        res.json(missionContent);
    })
})

router.delete('/delete/:uid', function (req, res, next) {

        database.deleteMission(req.params.uid).then( () => {
                res.json({ deletedMissionId: req.res.uid })
                resources.removeResourceDir(req.params.uid);
        })
})

router.post('/update', function (req, res, next) {
    database.updateMission(req.body).then( () => {
        res.send("OK");
    })
})

router.post('/uploadRes', function (req, res, next) {

    let resData = resources.addResource(req.body.missionId, req.files.file)
    res.json(resData)
})


router.delete('/deleteRes/:uid/:fileName', function (req, res, next) {
    resources.removeResource(req.params.uid, req.params.fileName)
    res.send("OK");
})

module.exports = router