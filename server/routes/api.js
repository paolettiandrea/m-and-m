const express = require('express')
const router = express.Router();
const schema = require("../public/api/schemas/converter")

router.get('/schema', function (req, res, next) {
    schema().then(sch => { res.json(sch) })
})

module.exports = router