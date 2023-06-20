const express = require('express');
const { SetContactDetails } = require('../Controllers/contactUsController');

const router = express.Router();

router.post('/contact-us', SetContactDetails);

module.exports = router;
