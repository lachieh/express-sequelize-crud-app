const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../auth').ensureAuthenticated;
const models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.Post.findAll({
    include: [
      models.User
    ]
  })
  .then(posts => {
    res.render('posts', {
      title: 'Posts',
      posts: posts,
      isLoggedIn: req.isAuthenticated
    });
  })
});

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  models.Post.findById(req.params.id, {
    include: [
      models.User,
      {
        model: models.Comment,
        include: [
          {
            model: models.User,
            as: 'Commenter',
          }
        ],
      },
    ]
  })
  .then(post => {
    res.render('post', {
      title: post.title,
      post: post,
      isLoggedIn: req.isAuthenticated
    });
  })
});

module.exports = router;
