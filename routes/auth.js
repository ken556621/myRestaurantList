const express = require('express');
const router = express.Router();
const passport = require('passport');

//facebook 登入
router.get('/facebook',
  passport.authenticate('facebook', { scope: ['email', 'displayName'] }));

router.get('/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/users/login' })
  );

  module.exports = router;