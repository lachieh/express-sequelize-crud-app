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
      isLoggedIn: req.isAuthenticated()
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
          models.User,
        ],
      },
    ],
  })
  .then(post => {
    res.render('post', {
      title: post.title,
      post: post,
      isLoggedIn: req.isAuthenticated()
    });
  })
});

router.post('/new', (req, res) => {
  if (!req.body.title) {
    return res.render('error', {
      message: 'No Post Title Provided',
      error: {
        status: 'You must provide a title to submit a new post',
        stack: null,
      }
    })
  }
  if (!req.body.content) {
    return res.render('error', {
      message: 'No Content Provided',
      error: {
        status: 'You must provide some content to submit a new post',
        stack: null,
      }
    })
  }
  models.Post.create({
    title: req.body.title,
    content: req.body.content,
    UserId: req.user,
  })
    .then(post => {
      return res.redirect(`/posts/${post.id}`);
    });
})

module.exports = router;
