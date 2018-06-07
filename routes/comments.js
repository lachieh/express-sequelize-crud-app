const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../auth').ensureAuthenticated;
const models = require('../models');

router.all('*', ensureAuthenticated);

router.post('/new', function (req, res, next) {
    if (!req.body.post) {
        return res.render('error', {
            message: 'No ID Provided',
            error: {
                status: 'You must provide a Post ID to submit a new comment',
                stack: null,
            }
        })
    }
    if (!req.body.comment) {
        return res.render('error', {
            message: 'No Comment Provided',
            error: {
                status: 'You must provide a comment to submit a new one',
                stack: null,
            }
        })
    }
    models.Comment.create({
        content: req.body.comment,
        UserId: req.user,
        PostId: req.body.post,
    })
    .then(comment => {
        return res.redirect(`/posts/${req.body.post}`);
    });
});

module.exports = router;
