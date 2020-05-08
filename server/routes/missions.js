const express = require('express')
const router = express.Router();

router.get('/', function (req, res, next) {
    res.json([
        {
            title: "A title",
            summary: "A short little description"
        },
        {
            title: "Another title",
            summary: "Another short little descritpion"
        }])
})

module.exports = router