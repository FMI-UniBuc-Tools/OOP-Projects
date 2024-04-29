/* 
TODO - Implement the POST request in the BE based on the following code 
*/

import dotenv from 'dotenv';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import mysql from 'mysql2';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({
    path: resolve(__dirname + '/../../.env'),
});


const connectionString = process.env.DATABASE_LOGIN
// console.log(connectionString)
const parsedConnectionString = new URL(connectionString);

const host = parsedConnectionString.hostname;
const port = parsedConnectionString.port;
const user = parsedConnectionString.username;
const password = parsedConnectionString.password;
const database = parsedConnectionString.pathname.slice(1);

const connection = mysql.createConnection({
  host: host,
  port: port,
  user: user,
  password: password,
  database: database
});


connection.connect((err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('connected to the db');
});

const table = database + ".`app.user`"

const insertQuery = `INSERT INTO ${table}  
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`;


//user, user_type, first_name, last_name, email, password, study_year, study_group, git_token
const sampleData = [1111, 'student', 'Ion', 'Popescu', 'test@test.com', 'pass', '2023', '462', 'Git_Token'];


connection.query(insertQuery, sampleData, (err) => {
  if (err) {
    console.error(err);
    connection.end();
    return;
  }
  console.log('data inserted successfully');
  connection.end();
  return
});
