const express = require('express')
const router = express.Router();

router.get('/', function (req, res, next) {
    res.json([{title: "Yoyoyo"}, { title: "Yayayay"}])
})

module.exports = router