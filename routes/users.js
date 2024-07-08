var express = require('express');
import mysql from 'mysql2/promise';


var router = express.Router();

// Create the connection to database
const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'test',
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// A simple SELECT query
try {
  const [results, fields] = await connection.query(
    'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45'
  );

  console.log(results); // results contains rows returned by server
  console.log(fields); // fields contains extra meta data about results, if available
} catch (err) {
  console.log(err);
}

// Using placeholders
try {
  const [results] = await connection.query(
    'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
    ['Page', 45]
  );

  console.log(results);
} catch (err) {
  console.log(err);
}

module.exports = router;
