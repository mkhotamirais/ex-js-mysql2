import mysql from "mysql2/promise";
import "dotenv/config";

let dbConfig = {};

if (process.env.NODE_ENV === "production") {
  dbConfig = {
    host: process.env.DB_HOST_PROD,
    user: process.env.DB_USER_PROD,
    password: process.env.DB_PASS_PROD,
    database: process.env.DB_NAME_PROD,
  };
} else {
  dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  };
}

const db = mysql.createPool(dbConfig);

export default db;
