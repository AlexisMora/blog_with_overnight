import * as mysql from 'mysql'

export const con = mysql.createConnection({
    host:"localhost",
    user:"alexis",
    password:"alexis",
    database:"majorcanRecipesBlogger"
})
