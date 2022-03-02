const express = require('express')
const { contactUs } = require('../controllers/contactUsController')
const router = express.Router()

router.post('/', contactUs)

module.exports = router
