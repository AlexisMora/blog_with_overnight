"use strict";
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var passport = require('passport');
passport.use(new GoogleStrategy({
    clientID: "",
    clientSecret: "",
    callbackURL: "login/google/callback"
}));
//# sourceMappingURL=GoogleStrategy.js.map