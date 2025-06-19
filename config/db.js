import mysql from "mysql2/promise";
import "dotenv/config";

const isDev = process.env.NODE_ENV === "development";
const host = isDev ? process.env.DB_HOST_DEV : process.env.DB_HOST;
const user = isDev ? process.env.DB_USER_DEV : process.env.DB_USER;
const password = isDev ? process.env.DB_PASS_DEV : process.env.DB_PASS;
const database = isDev ? process.env.DB_NAME_DEV : process.env.DB_NAME;

const dbConfig = { host, user, password, database };

const db = mysql.createPool(dbConfig);

export default db;
