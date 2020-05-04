const express = require('express')
const router = express.Router();

router.get('/', function (req, res, next) {
    res.send("Through this route you'll get activities and such");
})

module.exports = router