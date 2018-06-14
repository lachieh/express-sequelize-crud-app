var express = require('express');
var router = express.Router();

/* GET about page */
router.get('/', function(req, res, next) {
  res.render('about', {
    title: 'About',
    bodyClass: 'about',
    content: 'This is the content for the about page.'
  });
});

module.exports = router;
