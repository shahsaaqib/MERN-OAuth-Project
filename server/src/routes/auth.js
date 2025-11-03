const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  (req, res) => {
    res.redirect(process.env.CLIENT_ORIGIN || 'http://localhost:5173');
  });

// GitHub
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/failure' }),
  (req, res) => res.redirect(process.env.CLIENT_ORIGIN || 'http://localhost:5173'));

// Facebook
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/auth/failure' }),
  (req, res) => res.redirect(process.env.CLIENT_ORIGIN || 'http://localhost:5173'));

router.get('/failure', (_, res) => res.status(401).send('OAuth failed'));

router.get('/me', (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
  res.json({ user: req.user });
});

router.post('/logout', (req, res) => {
  req.logout(() => {
    req.session.destroy(err => {
      res.clearCookie('connect.sid');
      res.json({ ok: true });
    });
  });
});

module.exports = router;
