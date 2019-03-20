var express = require('express');
var bodyParser = require('body-parser');
const app = express.Router();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser());


// var mysql = require('mysql');
// var HOST = 'localhost';
// var PORT = 3306;
// var MYSQL_USER = 'root';
// var MYSQL_PASS = '';
// var DATABASE = 'Onboarding';


// var con = mysql.createConnection({
//     host: HOST,
//     port: PORT,
//     user: MYSQL_USER,
//     password: MYSQL_PASS,
//     database: DATABASE
// });



// con.connect(function(err) {
//     console.log(err);
//     if (err) throw err;
//     console.log("Connected!");
//     //    con.query("Select * from VisiterRecord", function (err, result) {
//     //        if (err) throw err;
//     //        //console.log(result);
//     //        console.log((JSON.stringify(result[0].escort_date)).substring(+ req.body.  +,+ req.body.  ++ req.body.  +).split("-").reverse().join('-'));
//     //    });
// });

module.exports = {

    // insert_asset : function insert_asset(req, res) {        
    //     console.log('LENGTH --> ', req.body.asset_name.length);
    //     var i;
    //     for (i=0; i<req.body.asset_name.length; i++){
    //         var enter_asset_query = "INSERT INTO `Asset` (`In_Out_Flag`, `Area`, `Emp_name`, `Emp_ID`, `Project`, `Date_of_Entry`, `Asset_Name`, `Asset_Type`, `Asset_ID`, `Quantity`, `Purpose`, `Conection_Flag`, `Comments`) VALUES ('" + req.body.asset_in_out + "', '" + req.body.asset_area + "', '" + req.body.asset_emp_name + "', '" + req.body.asset_emp_id + "', '" + req.body.asset_emp_project  + "', SYSDATE(), '" + ', ' + req.body.asset_name[i]  + "', '" + req.body.asset_type[i]  + "', '" + req.body.asset_id[i]  + "', '" + req.body.asset_qty[i]  + "', '" + req.body.asset_purpose  + "', '" + req.body.asset_network_connect  + "', 1)";
    //         con.query(enter_asset_query, function(err, result) {
    //             if(err){
    //                 throw err;
    //             }
    //             else {
    //                 console.log("Entered data");
    //             }
    //         });
    //         console.log('Entered row --->', i+1);
    //         console.log(enter_asset_query);
    //         console.log('---------------------------------------------------------');
    //     }
    // }
}

/*
asset_in_out: 'in',
  asset_area: 'BUIT',
  asset_emp_name: 'Aayush',
  asset_emp_id: '849+ req.body.  +86',
  asset_emp_project: 'Lilly',
  asset_name: 'Keyboard',
  asset_type: 'keyboard',
  asset_id: '83+ req.body.  +589+ req.body.  +5uhu',
  asset_qty: '2',
  asset_network_connect: 'Yes'
*/
