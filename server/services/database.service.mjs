import mysql from 'mysql';
import config from '../config/config.mjs';

const connection = mysql.createConnection({
    host    : config.host,
    port    : config.port,
    user    : config.username,
    password: config.password,
    database: config.database

});
await connection.connect();
console.log('Connected to database');

// Default async query, 
// Params:
//      sql: SQL query string
//      params: params for query
// Note: Be sure to connect to the database before running this example
// @ts-nocheck
export const query = async(sql, params) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(JSON.parse(JSON.stringify(rows)));
        });
    });
}    

