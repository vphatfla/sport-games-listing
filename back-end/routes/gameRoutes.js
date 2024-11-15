const express = require('express')
const { getNFLData } = require('../controllers/nflController')

const router = express.Router()

router.get('/nfl-games', getNFLData);

module.exports = router