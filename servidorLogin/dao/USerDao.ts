import { con } from '../config/database'
import * as mysql from 'mysql'
export function findUser(emailUser:any) {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM user where email='+mysql.escape(emailUser)
        con.query(sql, function (err, result) {
            if (err) throw reject(err)
            console.log(result)
            resolve(result)
        })
    })

}