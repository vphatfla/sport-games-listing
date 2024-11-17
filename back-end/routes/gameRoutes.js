const express = require('express')
const { getNFLData } = require('../controllers/nflController')
const { getNBAData } = require('../controllers/nbaController')
const { getNLBData } = require('../controllers/nlbController')
const { getNHLData } = require('../controllers/nhlController')
const { getSOCData } = require('../controllers/socController')

const router = express.Router()

router.get('/nfl-games', getNFLData);
router.get('/nba-games', getNBAData);
router.get('/nlb-games', getNLBData);
router.get('/nhl-games', getNHLData);
router.get('/soc-games', getSOCData);

module.exports = router