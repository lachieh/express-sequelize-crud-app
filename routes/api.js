const express = require('express');
const router = express.Router();
const models = require('../models');

// Return empty JSON for root API URL
router.get('/', (req, res, next) => {
    res.json({});
});

router.post('/post', (req, res, next) => {
    models.Post.create({
        title: req.body.title,
        content: req.body.content,
        UserId: 1
    })
    .then(post => {
        res.json(post);
        // res.redirect('/posts');
    })
});

module.exports = router;
