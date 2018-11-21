var express= require('express');
var mysql = require('mysql');
var app = express();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: 'Onboarding',
  port:'3306'
});

con.connect(function(err) {
    console.log(err);
  if (err) throw err;
  console.log("Connected!");
  con.query("Select * from Temp", function (err, result) {
    if (err) throw err;
    console.log(result);
 });
});
