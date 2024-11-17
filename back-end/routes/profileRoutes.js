const express = require('express')
const { setProfile, getProfile } = require('../controllers/profileController')

const router = express.Router()

router.post('/setting', setProfile)
router.get('/', getProfile)

module.exports = router