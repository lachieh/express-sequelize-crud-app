const express = require('express');
const router = express.Router();
const models = require('../models');

// Return empty JSON for root API URL
router.get('/', (req, res, next) => {
    res.json({});
});

module.exports = router;
