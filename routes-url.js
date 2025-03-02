const express = require('express');
const{ handleGenerateNewShortURL,  handlegetAnalytics } = require('../controllers/Controller-url.js');
const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get('/analytics/:shortId',handlegetAnalytics)
module.exports = router;