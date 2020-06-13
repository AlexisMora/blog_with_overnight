"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginServer = void 0;
var tslib_1 = require("tslib");
var bodyParser = require("body-parser");
var core_1 = require("@overnightjs/core");
var AuthController_1 = require("./controller/AuthController");
var passport = require("passport");
var cors = require("cors");
var LoginServer = (function (_super) {
    tslib_1.__extends(LoginServer, _super);
    function LoginServer() {
        var _this = _super.call(this, process.env.NODE_ENV === 'development') || this;
        _this.app.use(bodyParser.json());
        _this.app.use(bodyParser.urlencoded({ extended: true }));
        var whitelist = ['http://localhost:8081', 'http://localhost:8080', 'http://localhost:63342', 'http://localhost:63343', 'http://localhost:5500'];
        var options = {
            origin: whitelist,
            credentials: true,
            allowedHeaders: 'Authorization, Origin, X-Requested-With, Content-Type, Accept',
            methods: 'POST, GET, DELETE, PUT, OPTIONS',
            maxAge: 3600
        };
        _this.app.use(cors(options));
        _this.app.use(passport.initialize());
        _this.setupControllers();
        return _this;
    }
    LoginServer.prototype.setupControllers = function () {
        var authController = new AuthController_1.AuthController();
        _super.prototype.addControllers.call(this, [authController]);
    };
    LoginServer.prototype.start = function (port) {
        this.app.listen(port, function () {
            console.log('Server listening on port: ' + port);
        });
    };
    return LoginServer;
}(core_1.Server));
exports.LoginServer = LoginServer;
//# sourceMappingURL=LoginServer.js.map