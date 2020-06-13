"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@overnightjs/core");
var jwt = require("jsonwebtoken");
var passport = require("passport");
require("../config/passport");
var AuthController = (function () {
    function AuthController() {
    }
    AuthController.prototype.getUsers = function (req, res) {
        var _this = this;
        passport.authenticate('local', { session: false }, function (err, user, info) {
            console.log(err, user, info);
            if (err || !user) {
                return res.status(401).json({
                    message: 'Login failed',
                    user: user
                });
            }
            req.login(user, { session: false }, function (err) {
                var token = _this.generateToken(user.email);
                return res.json({
                    token: token,
                    email: user.email
                });
            });
        })(req, res);
    };
    AuthController.prototype.googleLogin = function (req, res) {
        console.log("entra en googleLogin");
    };
    ;
    AuthController.prototype.googleLoginCb = function (req, res, next) {
        console.log("entra en el callback");
        var maybeToken = this.generateToken(req.user);
        console.log("este el token generado por nosotros: ", maybeToken);
        res.redirect("http://localhost:8081/#/Admin?token=" + maybeToken + "&userEmail=" + req.user);
    };
    AuthController.prototype.generateToken = function (email) {
        var tokenData = {
            sub: email
        };
        var token = jwt.sign(tokenData, '1cf697f4c15c9b5b6baff828ae24930b81947fab664f928225684e5e75f45e26', {
            expiresIn: 60 * 60 * 24
        });
        return token;
    };
    tslib_1.__decorate([
        core_1.Post('login'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], AuthController.prototype, "getUsers", null);
    tslib_1.__decorate([
        core_1.Get('google'),
        core_1.Middleware(passport.authenticate('google', { scope: 'email' })),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], AuthController.prototype, "googleLogin", null);
    tslib_1.__decorate([
        core_1.Get('google/callback'),
        core_1.Middleware(passport.authenticate('google', { session: false })),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], AuthController.prototype, "googleLoginCb", null);
    AuthController = tslib_1.__decorate([
        core_1.Controller('auth')
    ], AuthController);
    return AuthController;
}());
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map