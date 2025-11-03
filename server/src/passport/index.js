const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');

module.exports = function(passport) {
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const u = await User.findById(id);
      done(null, u);
    } catch (err) {
      done(err);
    }
  });

  // Google
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BASE_URL}/auth/google/callback`
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ providerId: profile.id, provider: 'google' });
      if (!user) {
        user = await User.create({
          provider: 'google',
          providerId: profile.id,
          displayName: profile.displayName,
          email: profile.emails && profile.emails[0] && profile.emails[0].value
        });
      }
      done(null, user);
    } catch (err) { done(err); }
  }));

  // GitHub
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${process.env.BASE_URL}/auth/github/callback`
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ providerId: profile.id, provider: 'github' });
      if (!user) {
        const email = (profile.emails && profile.emails[0] && profile.emails[0].value) || null;
        user = await User.create({
          provider: 'github',
          providerId: profile.id,
          displayName: profile.displayName || profile.username,
          email
        });
      }
      done(null, user);
    } catch (err) { done(err); }
  }));

  // Facebook
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: `${process.env.BASE_URL}/auth/facebook/callback`,
    profileFields: ['id', 'displayName', 'emails']
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ providerId: profile.id, provider: 'facebook' });
      if (!user) {
        user = await User.create({
          provider: 'facebook',
          providerId: profile.id,
          displayName: profile.displayName,
          email: profile.emails && profile.emails[0] && profile.emails[0].value
        });
      }
      done(null, user);
    } catch (err) { done(err); }
  }));
};
