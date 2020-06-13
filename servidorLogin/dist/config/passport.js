"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var passport = require("passport");
var passportLocal = require("passport-local");
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var LocalStrategy = passportLocal.Strategy;
var USerDao_1 = require("../dao/USerDao");
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});
passport.use(new LocalStrategy({
    usernameField: 'usuari',
    passwordField: 'contrasenya'
}, function (email, password, done) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var resultat;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('ENTRA A PASSPORT LOCAL');
                    return [4, USerDao_1.findUser(email)];
                case 1:
                    resultat = _a.sent();
                    console.log("Resultat: ", resultat);
                    if (email = resultat[0].email && password == resultat[0].password) {
                        return [2, done(null, {
                                email: resultat[0].email
                            })];
                    }
                    else {
                        return [2, done("Error d'autenticacio")];
                    }
                    return [2];
            }
        });
    });
}));
passport.use(new GoogleStrategy({
    clientID: "456348531371-6b75so7kns8a7c9snrgdqm7db9ulipfj.apps.googleusercontent.com",
    clientSecret: "n9whSfs8QUyOlBLb-bINS_kB",
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true,
}, function (request, accessToken, refreshToken, profile, done) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var emailGoogle, resultat;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    emailGoogle = profile.emails[0].value;
                    console.log(profile.emails[0].value);
                    return [4, USerDao_1.findUser(emailGoogle)];
                case 1:
                    resultat = _a.sent();
                    if (emailGoogle = resultat[0].email) {
                        return [2, done(null, profile.emails[0].value)];
                    }
                    else {
                        return [2, done("Error d'autenticacio")];
                    }
                    return [2];
            }
        });
    });
}));
//# sourceMappingURL=passport.js.map