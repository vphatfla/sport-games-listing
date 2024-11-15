const express = require('express')
const { getNFLData } = require('../controllers/nflController')
const { getNLBData } = require('../controllers/nlbController')
const { getNBAData } = require('../controllers/nbaController')

const router = express.Router()

router.get('/nfl-games', getNFLData);
router.get('/nlb-games', getNLBData);
router.get('/nba-games', getNBAData);

module.exports = router