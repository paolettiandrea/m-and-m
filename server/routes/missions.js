const express = require('express')
const router = express.Router();

router.get('/', function (req, res, next) {
    res.json([                  //TEMP
        {
            uid: 1,
            title: "A title",
            summary: "A short little description"
        },
        {
            uid: 2,
            title: "Another title",
            summary: "Another short little descritpion"
        }])
})

module.exports = router