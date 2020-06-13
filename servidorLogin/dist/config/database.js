"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.con = void 0;
var mysql = require("mysql");
exports.con = mysql.createConnection({
    host: "localhost",
    user: "alexis",
    password: "alexis",
    database: "majorcanRecipesBlogger"
});
//# sourceMappingURL=database.js.map