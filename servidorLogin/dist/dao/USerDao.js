"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUser = void 0;
var database_1 = require("../config/database");
var mysql = require("mysql");
function findUser(emailUser) {
    return new Promise(function (resolve, reject) {
        var sql = 'SELECT * FROM user where email=' + mysql.escape(emailUser);
        database_1.con.query(sql, function (err, result) {
            if (err)
                throw reject(err);
            console.log(result);
            resolve(result);
        });
    });
}
exports.findUser = findUser;
//# sourceMappingURL=USerDao.js.map