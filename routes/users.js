const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../auth').ensureAuthenticated;
const models = require('../models');

router.all('*', ensureAuthenticated);

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.User.findAll()
  .then(users => {
    res.render('users', {
      title: 'Users',
      users: users
    });
  })
});

module.exports = router;
