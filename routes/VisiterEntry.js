var express = require('express');
var bodyParser = require('body-parser');
const app = express.Router();
var cron = require('node-cron');
<<<<<<< HEAD
var fs = require('fs');
//var pdf = require('html-pdf');
=======
 
>>>>>>> 7f2a40380ad0e455c5c548c571fa1b6cf7de7fab



app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser());


var mysql = require('mysql');
var HOST = 'localhost';
var PORT = 3306;
var MYSQL_USER = 'root';
var MYSQL_PASS = '';
var DATABASE = 'Onboarding';


var con = mysql.createConnection({
   host: HOST,
   port: PORT,
   user: MYSQL_USER,
   password: MYSQL_PASS,
   database: DATABASE
});

con.connect(function(err) {
   console.log(err);
   if (err) throw err;
   console.log("Connected!");
   con.query("Select * from VisiterRecord", function (err, result) {
       if (err) throw err;
       //console.log(result);
       console.log((JSON.stringify(result[0].escort_date)).substring(1,11).split("-").reverse().join('-'));
   });
});
function timeNow() {
    var d = new Date(),
      h = (d.getHours()<10?'0':'') + d.getHours(),
      m = (d.getMinutes()<10?'0':'') + d.getMinutes();
   return h + ':' + m;
  }
<<<<<<< HEAD
/* function htmlToPDF(request)
{
  //you can collect fields to be displayed in html from request.body object and create a dynamic html string which can be passed directly to 
  // code provided below
  //for more references refer https://www.npmjs.com/package/html-pdf
  var html = '<html><body><div style="color:red">54564trtytyty5665r</div></body></html>';
  var options = { format: 'Letter' };
  //try to keep it unique for each request
   var pdfname='businesscard.pdf';
  pdf.create(html, options).toFile('./'+pdfname, function(err, res) {
    if (err) return console.log(err);
    console.log(res); // { filename: '/app/businesscard.pdf' }
  });

} */
=======
>>>>>>> 7f2a40380ad0e455c5c548c571fa1b6cf7de7fab

  app.get('/getFloors', function(req,res){
   // var userIdLocalstorage = req.body.loggedInUser;
    var query = `SELECT * from floor`;
    con.query(query, function(err,result){
      if (err)
      throw err;
      let arr=[];
      for (let index = 0; index < result.length; index++) {
      
        arr.push({floorcode:result[index].floorcode,floorname:result[index].floorname});
      }
      res.json(arr);
<<<<<<< HEAD
    });
  });
  app.post('/localStorageUserId', function(req,res){
    var userIdLocalstorage = req.body.loggedInUser;
    var chckUserinDb = `SELECT is_login FROM guard_details WHERE user_id = '${userIdLocalstorage}'`;
    con.query(chckUserinDb, function(err,result){
      if(result[0].is_login == 0){
        res.send({loggedOutInDB: true});
      }
      else
      {
        res.send({loggedOutInDB: false});
      }
    });
  });
=======
    });
  });
  app.post('/localStorageUserId', function(req,res){
    var userIdLocalstorage = req.body.loggedInUser;
    var chckUserinDb = `SELECT is_login FROM guard_details WHERE user_id = '${userIdLocalstorage}'`;
    con.query(chckUserinDb, function(err,result){
      if(result[0].is_login == 0){
        res.send({loggedOutInDB: true});
      }
      else
      {
        res.send({loggedOutInDB: false});
      }
    });
  });
>>>>>>> 7f2a40380ad0e455c5c548c571fa1b6cf7de7fab

app.post('/addVisitor', function(req, res) {
   console.log(req.body);
  
   //if(req.body.visitor_company == "Other")  
   //{
       req.body.visitor_company=req.body.visitor_company_other;
//}
   
   console.log("NewSignature:"+req.body.escort_signature);
<<<<<<< HEAD
//    if(req.body.escort_signature != "")
//    {
       req.body.escort_signature="Y";
       console.log("sign:"+req.body.escort_signature)
  // }
   req.body.escort_time_from='TIME(now())';
   req.body.escort_date=new Date();
   req.body.visitor_access = "Permanent";
   if ( typeof(req.body.txt_whom_to_meet)=="undefined")
   {
    req.body.txt_whom_to_meet="";
   }
   if ( typeof(req.body.txt_purpose_escort_unit)=="undefined")
   {
   req.body.txt_purpose_escort_unit="";
   }

   if ( typeof(req.body.txt_project)=="undefined")
   {
                req.body.txt_project="";
   }
                /* 
=======
   if(req.body.escort_signature != "")
   {
       req.body.escort_signature="Y";
       console.log("sign:"+req.body.escort_signature)
   }
   req.body.escort_time_from='TIME(now())';
   req.body.escort_date=new Date();
   req.body.visitor_access = "Permanent";
   //if ( typeof(req.body.txt_whom_to_meet)=="undefined")
   //{
    req.body.txt_whom_to_meet="";
   //}
   req.body.txt_purpose_escort_unit="";
                req.body.txt_project="";
/* 
>>>>>>> 7f2a40380ad0e455c5c548c571fa1b6cf7de7fab
   var escort = "select * from escort_table where escort_Id="+req.body.escort_empid;
   con.query(escort,function(err, result)     
             {                                                      
       if (err)
           throw err;
       req.body.escort_name=result[0].escort_Name;
       req.body.escort_unit=result[0].project;
       req.body.escort_smartcard=result[0].smartCard;

   }); */

   var identification="";
/* 
   if(req.body.Identification)
   {
       identification= identification+","+req.body.Identification;
   }
   if(req.body.Identification1)
   {
       identification= identification+","+req.body.Identification1;
   }
   if(req.body.Identification2)
   {
       identification= identification+","+req.body.Identification2;
   }
   if(req.body.Identification3 )
   {
       identification= identification+","+req.body.Identification3;
   }
   if(req.body.Identification4)
   {
       identification= identification+","+req.body.Identification4;
   }
   if(req.body.Identification5)
   {
       identification= identification+","+req.body.Identification5;
   }

 */   
console.log(req.body.visitor_empid);
   var inputs = Array.isArray(req.body.visitor_name_new);
   if(inputs){
       var i=0;
       var length = (req.body.visitor_name_new).length;
       var data = [];
       console.log(data);

       con.query("SELECT count( distinct groupId) AS alias from visiterrecord where groupid<>'"+"Individual'", function (err, result) {
           if (err) 
               throw err;
                 var   groupId= "group"+result[0].alias;
           console.log(groupId);
           while(i<length){

               check(req.body.visitor_empid[i],req.body.visitor_name_new[i]
                ,req.body.visitor_company,req.body.escort_unit,
                req.body.visitor_smartcard[i],req.body.visitor_access,
                req.body.visitor_asset[i],req.body.visitor_purpose,req.body.escort_empid
                ,req.body.escort_name,req.body.escort_unit,req.body.escort_smartcard,
                'now()',req.body.escort_time_from,req.body.escort_time_to,
                identification,req.body.escort_signature,req.body.visitor_signature,
                 req.body.area[i], req.body.Hall, groupId,req.body.escort_signature_JSON
                 ,req.body.visitor_signature_JSON[i],req.body.txt_whom_to_meet,req.body.txt_purpose_escort_unit
                 ,req.body.txt_project);
               console.log(req.body.project);
               i++;

           }
       });
            res.redirect('/visitorGrid');
        //res.render('Visitor_Status', {layout: true});

   }else{
       var groupId = "Individual";
       var Hall = req.body.Hall;
       var getId="select * from VisiterRecord where visitor_empid="+req.body.visitor_empid ;
       con.query(getId,function(err, result,fields)   
                 {     
           console.log("Test:"+result);
           var diffDays=8;

           if (err)
               throw err;
           else{ 
            
            //   var secondDate=  req.body.escort_date; 
               if(result.length >0)
               {
                   console.log("HelloEnter");
                  // var diffDays = parseInt((secondDate - result[result.length-1].escort_date) / (1000 * 60 * 60 * 24));
               }
               if(result.length >0 && req.body.visitor_access == "Permanent" && req.body.visitor_company == "Tata Consultancy Services (TCS)" && req.body.visitor_purpose=="New Joinee") //&& diffDays < 8)
               {
                   con.query("select count(*) as count from VisiterRecord where DATEDIFF('"+req.body.escort_date+"',escort_date) < 8 and visitor_empid="+req.body.visitor_empid,function(err, result)     
                             {  
                       console.log(result);                                                    
                       if (err)
                           throw err;
                       else if(result[0].count < 3)
                       {
                           var approvalStatus="pending";
                           var dayCount=result[0].count+1;
                           var sql = "Insert into VisiterRecord (visitor_empid,visitor_name,visitor_company,visitor_unit,visitor_smartcard,visitor_access,visitor_assetId,visitor_purpose,escort_empid,escort_name,escort_unit,escort_smartcard,escort_date,escort_time_from,escort_time_to,approvalStatus,dayCount,Identification,Hall,groupId,area,visitor_signature,escort_signature,persontomeet,areaofvisit,projectofvisit) VALUES ('"+req.body.visitor_empid+"','"+req.body.visitor_name_new+"','"+req.body.visitor_company+"','"+req.body.escort_unit+"','"+req.body.visitor_smartcard+"','"+req.body.visitor_access+"','"+req.body.visitor_asset+"','"+req.body.visitor_purpose+"','"+req.body.escort_empid+"','"+req.body.escort_name+"','"+req.body.escort_unit+"','"+req.body.escort_smartcard+"',now(),"+req.body.escort_time_from+",'"+req.body.escort_time_to+"','"+approvalStatus+"','"+dayCount+"','"+identification+"','"+Hall+"','"+groupId+"','"+req.body.area+"','"+req.body.visitor_signature_JSON+"','"+req.body.escort_signature_JSON+"','"+req.body.txt_whom_to_meet +"','"+req.body.txt_purpose_escort_unit+"','"+req.body.txt_project+"') ";
                           con.query(sql,function(err, result)     
                                     {                                                      
                               if (err)
                                   throw err;
                               else{
                                   var sql1 = "Insert into escort_signature (escort_Id,escort_Name,Signature,visitor_Id,visitor_name,visitor_cardNo,Date) VALUES ('"+req.body.escort_empid+"','"+req.body.escort_name+"','"+req.body.escort_signature+"','"+req.body.visitor_empid+"','"+req.body.visitor_name_new+"','"+req.body.visitor_smartcard+"',now())";
                                  console.log(sql1);
                                   con.query(sql1,function(err, result)     
                                             {                                                      
                                       if (err)
                                           throw err;

                                   });
                                   var sql2 = "Insert into visitor_signature (visitor_name,Signature,visitor_cardNo,Date) VALUES ('"+req.body.visitor_name_new+"','"+req.body.visitor_signature+"','"+req.body.visitor_smartcard+"',now())";
                                   con.query(sql2,function(err, result)     
                                             {                                                      
                                       if (err)
                                           throw err;

                                   });
                               }
                           });
                            res.redirect('/visitorGrid');
                           // res.redirect('Visitor_Status', {layout: true});
                       }
                       else{

                           res.render('SubmitResponse', {layout: true});
                       }

                   });

                   //    if(result[result.length-1].dayCount <3 )
                   //    {
                   //   console.log("if");
                   //   //var updateRecord="update VisiterRecord set dayCount=dayCount+1 where visitor_empid="+req.body.visitor_empid+ "and dayCount < 3";
                   //   con.query('UPDATE VisiterRecord SET dayCount= dayCount+1 WHERE visitor_empid= ? and dayCount=?',[req.body.visitor_empid,result[result.length-1].dayCount],function(err, result)     
                   //   {                                                      
                   //     if (err)
                   //       throw err;
                   //       console.log(result);

                   //   });
                   //    res.render('Status', {layout: true});
                   //   }
                   // else{
                   //   res.render('SubmitResponse', {layout: true});

                   //     }

               }
               else
               {
                   var approvalStatus="pending";
                   var dayCount=1;

<<<<<<< HEAD
                   var sql = "Insert into VisiterRecord (visitor_empid,visitor_name,visitor_company,visitor_unit,visitor_smartcard,visitor_access,visitor_assetId,visitor_purpose,escort_empid,escort_name,escort_unit,escort_smartcard,escort_date,escort_time_from,escort_time_to,approvalStatus,dayCount,Identification,Hall,groupId,area,visitor_signature,escort_signature,persontomeet,areaofvisit,projectofvisit) VALUES ('"+req.body.visitor_empid+"','"+req.body.visitor_name_new+"','"+req.body.visitor_company+"','"+req.body.escort_unit+"','"+req.body.visitor_smartcard+"','"+req.body.visitor_access+"','"+req.body.visitor_asset+"','"+req.body.visitor_purpose+"','"+req.body.escort_empid+"','"+req.body.escort_name+"','"+req.body.escort_unit+"','"+req.body.escort_smartcard+"',now(),"+req.body.escort_time_from+",'"+req.body.escort_time_to+"','"+approvalStatus+"','"+dayCount+"','"+identification+"','"+Hall+"','"+groupId+"','"+req.body.area+"','"+req.body.visitor_signature_JSON +"','"+req.body.escort_signature_JSON+"','"+req.body.txt_whom_to_meet +"','"+req.body.txt_purpose_escort_unit+"','"+req.body.txt_project+"') ";
=======
                   var sql = "Insert into VisiterRecord (visitor_empid,visitor_name,visitor_company,visitor_unit,visitor_smartcard,visitor_access,visitor_assetId,visitor_purpose,escort_empid,escort_name,escort_unit,escort_smartcard,escort_date,escort_time_from,escort_time_to,approvalStatus,dayCount,Identification,Hall,groupId,area,visitor_signature,escort_signature,persontomeet,areaofvisit,projectofvisit) VALUES ('"+req.body.visitor_empid+"','"+req.body.visitor_name_new+"','"+req.body.visitor_company+"','"+req.body.escort_unit+"','"+req.body.visitor_smartcard+"','"+req.body.visitor_access+"','"+req.body.visitor_asset+"','"+req.body.visitor_purpose+"','"+req.body.escort_empid+"','"+req.body.escort_name+"','"+req.body.escort_unit+"','"+req.body.escort_smartcard+"',now(),"+req.body.escort_time_from+",'"+req.body.escort_time_to+"','"+approvalStatus+"','"+dayCount+"','"+identification+"','"+Hall+"','"+groupId+"','"+req.body.area+"','"+req.body.visitor_signature_JSON +"','"+req.body.escort_signature_JSON+"','"+txt_whom_to_meet +"','"+txt_purpose_escort_unit+"','"+txt_project+"') ";
>>>>>>> 7f2a40380ad0e455c5c548c571fa1b6cf7de7fab
                   console.log(sql);
                   con.query(sql,function(err, result)     
                             {                                                      
                       if (err)
                           throw err;
                       else{
                           var sql1 = "Insert into escort_signature (escort_Id,escort_Name,Signature,visitor_Id,visitor_name,visitor_cardNo,Date) VALUES ('"+req.body.escort_empid+"','"+req.body.escort_name+"','"+req.body.escort_signature+"','"+req.body.visitor_empid+"','"+req.body.visitor_name_new+"','"+req.body.visitor_smartcard+"',now())";
                           console.log(sql1);
                           con.query(sql1,function(err, result)     
                                     {                                                      
                               if (err)
                                   throw err;

                           });
                           var sql2 = "Insert into visitor_signature (visitor_name,Signature,visitor_cardNo,Date) VALUES ('"+req.body.visitor_name_new+"','"+req.body.escort_signature+"','"+req.body.visitor_smartcard+"',now())";
                           console.log(sql2);
                           con.query(sql2,function(err, result)     
                                     {                                                      
                               if (err)
                                   throw err;

                           });

                       }

                   });


                    res.redirect('/visitorGrid');
               }
           }


       });
   }
});

app.post('/checkGuard', function(req,res){
    var userId = req.body.guard_id.toUpperCase();
    var password_received = req.body.guard_password;  
    var password_db;
    var isAuth = `SELECT * FROM guard_details WHERE upper(user_id) = '${userId}'`;
    var setLogin = `UPDATE guard_details SET is_login = 1 WHERE upper(user_id) = '${userId}'`;
    console.log(isAuth);
    con.query(isAuth, function(err, result){
      if (result == '' || result == null || result == undefined){
        res.send({authenticated : false});
      }
      else if(result[0].is_login == 1){
        res.send({already_loggedin : true});
      }
      else{
        password_db = result[0].password;
        if (err)
          throw err;    
        if( password_received === password_db ){
          con.query(setLogin, function(err, result){
            if (err)
              throw err;
          });
          res.send({authenticated: true, userId: userId, name: result[0].name});
          console.log(result[0].name);
        }
        else{
          res.send({authenticated : false});
          console.log('not authorized');
        } 
      }   
    });  
  });
  
  app.post('/logoutGuard', function(req,res){
      var logout_user = req.body.user_id;
      var logoutQuery = `UPDATE guard_details SET is_login = 0 WHERE user_id = '${logout_user}'`;
      con.query(logoutQuery, function(err){
        if (err){
          throw err;        
        }
        else{
          res.send({logged_out: true});
        }
      })
  });
  
  app.post('/localStorageUserId', function(req,res){
    var userIdLocalstorage = req.body.loggedInUser;
    var chckUserinDb = `SELECT is_login FROM guard_details WHERE user_id = '${userIdLocalstorage}'`;
    con.query(chckUserinDb, function(err,result){
      if(result[0].is_login == 0){
        res.send({loggedOutInDB: true});
      }
    });
  });
  
cron.schedule('0 6,14,22 * * *', () => {
  var logoutQuery = `UPDATE guard_details SET is_login = 0 WHERE 1`;
    con.query(logoutQuery, function(err){
      if (err){
        throw err;   
             
      }      
    });
});

app.post("/getApprovalToken",function(req, res) {
try{

console.log("escortID: "+req.body.escort_id);
var timeStamp=Math.floor(Date.now() / 1000);
var val=Math.floor(Math.random() * 10);
 var val1=Math.floor(Math.random() * 10);
 var val2=Math.floor(Math.random() * 10);
getTimeStamp(req.body.escort_id,function(result){
  console.log("length: "+result);
  if(result == 0)
  {
    var sql1 = "Insert into otp_table (Id,timeStamp) VALUES ('"+req.body.escort_id+"','"+timeStamp+"')";
    con.query(sql1,function(err, result)     
    {                                                      
     if (err)
       throw err;

       console.log("Please verify approval token :"+ result);
      
 
   });
    var token=val+approvalToken(req.body.escort_id)+val1+val2;
    res.send("Please verify approval token :"+token);
    }
    else if((timeStamp-result) < 10*60){
     console.log("time:-"+result);
     console.log(timeStamp-result);
      res.send("Please Enter Previous token!!");
      
        // con.query('UPDATE otp_table SET timeStamp= ? WHERE Id= ?',[timeStamp,req.body.escort_id],function(err, res)     
        // {                                                      
        //   if (err)
        //     throw err;
        //     console.log(res);
        //     response.send(true);
        // })
    }
    
        else{


            con.query('delete from otp_table WHERE Id= ?',[req.body.escort_id],function(err, res)     
                      {                                                      
                if (err)
                    throw err;
                console.log(res);

                // response.send(true);
            });
            res.send(false);
        }
    });
  
  }
  catch(error){
    console.error(error);
  }
});

app.post("/verifyApprovalToken",function(req, res) {

  try{
  
  //console.log(approverMasking(req.body.token_key));
  res.send(approverMasking(req.body.token_key));
  }
  catch(error)
{
  console.error(error);
}
  });



app.post("/visitorApproved",function(req, response,callback) {
  try{
  console.log("visitorId"+req.body.visitor_id);
  console.log("escort_id"+req.body.escort_id);
  var approverId=req.body.getToken.split('');
  var getVerifiedToken=tokenVerify(req.body.getToken.split('').reverse().join(''));
  var verifyAgain=tokenVerify(getVerifiedToken.split('').reverse().join(''));
  console.log("verifyAgain"+verifyAgain);
  var timeDiff="";
  //-------------------------------Expire count from generated end-----------------------//

   getTimeStamp(req.body.visitor_id,function(timeStamp){
       console.log("savedTime: "+timeStamp);
       var currentTimestamp= Math.floor(Date.now() / 1000);

       timeDiff=currentTimestamp-timeStamp;
       console.log("currentTime: "+currentTimestamp);

       con.query('delete from otp_table WHERE Id= ?',[req.body.escort_id],function(err, res)     
                 {                                                      
           if (err)
               throw err;
           console.log(res);
           // response.send(true);
    });



       //-----------------------------------end-----------------------------------------//


       //-----------Expire OTP from approver End generation------------//
       //var approverId=req.body.getToken.split(req.body.escort_id);
       // var tempTime="";
       var id="";
       var escortLength=req.body.escort_id.length;
       var actualId=verifyAgain.split('');
       for(var i=1;i<=escortLength;i++)
       {
           id = id+""+actualId[i];
       }
       console.log("approverIdtemp"+id);
       // for(var i=escortLength+1; i<verifyAgain.length;i++)
       // {
       //   tempTime=tempTime+""+actualId[i];
       // }

       // console.log("time1: "+tempTime);
       //  var temp=approvalToken(tempTime);
       //  var timestamp=approvalToken(temp);
       // console.log("timestamp: "+timestamp);
       // var currentTimestamp=Math.floor(Date.now() / 1000);

       //  var timeDiff= currentTimestamp-timestamp;
       //  console.log(timeDiff);
       //   var dd="";
       //   var mm="";
       //   console.log(approverId[0]+" "+approverId[1]+" "+approverId[2]+" "+approverId[approverId.length-2]+" "+approverId[approverId.length-1]);
       //   console.log(req.body.getToken.length+"/"+req.body.escort_id.length);
       // for(var hr=1; hr < temp1.length;hr++)
       // {
       //   hrs=hrs+temp1[hr];
       // }

       // dd=temp3[0]+""+temp3[1];
       // mm= temp3[temp3.length-4]+""+temp3[temp3.length-3];
       // min=temp3[temp3.length-2]+""+temp3[temp3.length-1];

       //  var date=new Date();
       //  var currentHrs=date.getHours();
       //  var currentMin=date.getMinutes();
       //  var currentDay=date.getDay();
       //  if(currentDay.length == 1)
       //  {
       //    currentDay="0"+currentDay;
       //  }
       //  if(currentMonth.length == 1)
       //  {
       //   currentMonth="0"+currentMonth;
       //  }
       //  var currentMonth=date.getMonth();
       // console.log(hrs+":"+min);

       // if(currentDay == dd && currentMonth == mm)
       // {
       // if(currentHrs == hrs || (currentHrs-hrs) < 2)
       // {
       // timeDiff=currentMin-min;

       // }
       // }
       // console.log("timeDiff:"+timeDiff);

       //---------------------------------------******-------------------------------//

       console.log("timeDiff: "+timeDiff);

if(timeDiff < 10*60)
{
  //var getVerifiedToken=tokenVerify(req.body.getToken.split('').reverse().join(''));
  //var verifyAgain=tokenVerify(getVerifiedToken.split('').reverse().join(''));
//console.log(verifyAgain);
  if(id.includes(req.body.escort_id))
  {
    
  var getId="select * from VisiterRecord where Id="+req.body.visitor_id;
  con.query(getId,function(err, result)   
  { 
    console.log("resultLength"+result.length);
  if(err)
  {
    response.send(false); 
  }
  else if(result.length>0)
  {
    if(req.body.groupId != "Individual")
    {
        console.log("req.body.groupId"+req.body.groupId);
          groupApproval(req.body.groupId,"Approved",approverId[0],function(res){
          if(res){
              response.send(true);
          }
          else{
              response.send(false);
          }
      });
    }
    else{
      con.query('UPDATE VisiterRecord SET approvalStatus= "Approved",ApproverRole_Id=? WHERE Id= ?',[approverId[0],req.body.visitor_id],function(err, res)     
      {                                                      
        if (err)
          throw err;
          response.send(true);
         
      });
    }
   }
  else{
    response.send(false);

    }
 });
}
else{
     response.send(false);

  }
 }
else{
    response.send(false);
 }
   // });
});
}
  catch(error)
  {
    console.error(error);
  }

  });

app.post("/validateVisitor",function(req, res) {
    try{
   console.log(req.body.visitor_id);
   var getId="select * from VisiterRecord where visitor_empid="+req.body.visitor_id;
   con.query(getId, function (err, result) {
       if (err) 
           throw err;
       if(result.length>0)
       {
           res.send(result[0].approvalStatus);
           console.log(result);
       }
       else{
           res.send("null");
       }
   });
  }
catch(error)
{
  console.error(error);
}
});

app.post("/validateEscort",function(req, res) {
      try{
      console.log(req.body.escort_id);
   if(req.body.escort_id ==='')
   return;
   var getId="select * from escort_table where escort_Id="+req.body.escort_id;   
   console.log(getId); 
   con.query(getId, function (err, result) {
       if (err) 
           throw err;
       console.log(result);
       if(result.length>0 && result[0].IsActive == "Y")
       {
           res.send(JSON.stringify(result));
           console.log(result);
       }
       else{
           res.send(false);
       }
   });
    }
  catch(error)
  {
  console.error(error);
  }
});
//
//
//
app.post("/visitorRecord",function(req, res) {

      try{
   var getId=`select * from VisiterRecord t1 LEFT JOIN approver_table t2 on t1.approverRole_Id =
    t2.Role_Id WHERE cast(escort_date as date)=cast(now() as date)
    order by escort_date desc`;
   con.query(getId, function (err, result,fields) {
       if (err) 
           throw err;
       // console.log(result);
       res.send(JSON.stringify(result));

   });

        }
      catch(error)
      {
        console.error(error);
      }
});

app.post("/updateOutTime",function(req, response){
   try{  
       console.log("updateOut");
       console.log(req.body);
       var date=new Date();
       var outTime= date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
       console.log("outTime: "+outTime);
       console.log("Floor "+req.body.floorCode);

       if(req.body.floorCode != ""){
           con.query('UPDATE VisiterRecord SET escort_time_to = ? WHERE Id= ?',[outTime,req.body.visitor_id],function(err, res)     
                     {   
               console.log(res);                                                 
               if (err)
                   throw err;

               getFloor(req.body.floorCode,function(floorName){
                   console.log(floorName);
                   checkIfVisiterExistOnFloor(req.body,floorName,function(isExist){
                       console.log("bool "+isExist);
                       if(isExist) 
                       {  
                           if(floorName == 0 )
                           {
                               response.send(false)
                           }
                           else{
                               con.query('UPDATE ?? SET OutTime = ?, status="Out" WHERE visitor_cardNo= ? and visitor_name= ?',[floorName,outTime,req.body.visitor_smartcard,req.body.visitor_name],function(err, res)     
                                         {   
                                   console.log(res);                                                 
                                   if (err)
                                       throw err;

                                   response.send(true);

                               });  
                           }
                       }
                   }); 

               });
           });
       }
       else{
           response.send(false);
       }
   }catch(error)
   {
       console.error(error);
   }
}); 

app.post("/updateInTime",function(req, response){
  try{
  console.log("updateOut");
  console.log(req.body.visitor_smartcard);
  console.log(req.body.visitor_name);
  var date=new Date();
  var InTime=date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
  checkIfVisitorInFloor(req.body,function(out){
    if(!out)
    {
        getFloor(req.body.floorCode,function(floorName){
          console.log("Name: "+ floorName);
        if(floorName ==0)
        {
          response.send("InCorrectFloorCode")
        }
        else{
          checkIfVisiterExistOnFloor(req.body,floorName,function(isExist){
        if(isExist)
        {    
        
       
        con.query('UPDATE ?? SET InTime = ?,status="In" WHERE visitor_cardNo= ? and visitor_name= ?',[floorName,InTime,req.body.visitor_smartcard,req.body.visitor_name],function(err, res)     
        {   
          console.log(res);                                                 
          if (err)
            throw err;
            response.send("updated");
         
        });  
      }
      else{
        response.send("NoAccess");
      }
      }); 
    }
    });
  }
  else{
    response.send("NoOut");

           }
       });
   }catch(error)
   {
       console.error(error);
   }
}); 


  app.post("/floorAuthentication",function(req, response){
    try{
        getFloor(req.body.floorCode,function(floorName){
            console.log("Name: "+ floorName);
          if(floorName ==0)
          {
            response.send("IncorrectFloorCode");
          }
          else{
            response.send("Correct");
          }
        });

    }catch(error){
        console.error(error);
    }
  });  


function checkIfVisiterExistOnFloor(body,floorName,callback){
try{  
console.log("body.visitor: "+body.visitor_name);
console.log("body.visitor: "+body.visitor_smartcard);
console.log(floorName);
  con.query('select * from ??  where visitor_name = ? and visitor_cardNo= ?',[floorName,body.visitor_name,body.visitor_smartcard],function(err,res){
    console.log("res.length "+res.length);
    if(err)
    throw err;
    else if(res.length>0)
    {
      callback(true);
    }
    else{
      console.log("else Enter");
      visitorAccessOnFloor(body,function(hall){
      if(!hall)
      {
        callback(false);
      } 
      else {
      
      var getFloor = floorName.split('_').join('');
      console.log("getFloor: "+hall);   
      if(hall.includes(getFloor))
      {  
      con.query("Insert into ??  (visitor_cardNo,visitor_name) VALUES ('"+body.visitor_smartcard+"','"+body.visitor_name+"')",[floorName],function(err,res){

        if(err)
        throw err;
        console.log("Inserted");
          callback(true);
        
      });
    }
    else{
      callback(false);
    }
    }
    });
    }
  });
}
  catch(error)
      {
        console.error(error);
      }
} 

function visitorAccessOnFloor(body,callback){
   try{
       console.log("visitorAccessOnFloor");
       console.log("body.visitor: "+body.visitor_name);
       console.log("body.visitor: "+body.visitor_smartcard);

       con.query("select Hall from visiterrecord where visitor_name=? and visitor_smartcard=?",[body.visitor_name,body.visitor_smartcard],function(err,res){

           if(err)
               throw err;
           else if(res.length>0){
               var hall=res[0].Hall.split(',');
               console.log("hall"+hall);
               callback(hall);
           }
           else{
               callback(false);
           }

       });
   }catch(error)
   {
       console.error(error);
   }

}

function getFloor(floorCode,callback)
{
  try{
  console.log("floorCode "+floorCode);
  con.query('select Floor_Name from floor_authentication where Floor_Code ='+floorCode,function(err,res){

    if(err)
    throw err;
    else if(res.length>0)
    {
      callback(res[0].Floor_Name);
    }
    else{
      callback(res.length);
    }
  });
}catch(error)
{
  console.error(error);
}
}

function checkIfVisitorInFloor(body,callback){
try{

    var sql="select * from floor_4 where visitor_name= '"+body.visitor_name+"' and visitor_cardNo= '"+body.visitor_smartcard+"' and status= 'In' UNION select * from floor_5 where visitor_name= '"+body.visitor_name+"' and status='In' and visitor_cardNo= '"+body.visitor_smartcard+"' UNION select * from floor_6 where visitor_name= '"+body.visitor_name+"' and status='In' and visitor_cardNo= '"+body.visitor_smartcard+"'";

  con.query(sql,function(err,res){
console.log("output: "+ res.length);
    if(err)
    throw err;
    else if(res.length>0)
    {
      callback(true);
    }
    else{
      callback(false);
    }
  });
}catch(error)
{
  console.error(error);
}
}


app.post("/getVisitorFloorStatus",function(req, response){
try{
  console.log(req.body.floorCode);
  console.log(req.body.visitor_name);
  console.log(req.body.visitor_smartcard);
  getFloor(req.body.floorCode,function(floorName){
console.log("floorName: " +floorName);
  con.query('select status from ?? where visitor_name = ? and visitor_cardNo=?',[floorName,req.body.visitor_name,req.body.visitor_smartcard],function(err,res){
console.log("output: "+res);
    if(err)
    throw err;
    else if(res.length>0)
    {
      response.send(res[0].status);
    }
    else{
      response.send("NotExist");
    }
  });
});
}
catch(error)
      {
        console.error(error);
      }
});

function approvalToken(id){
  try{
  console.log("access token");
var key0="8";
var key1="2";
var key2="5";
var key3="4";
var key4="1";
var key5="6";
var key6="0";
var key7="3";
var key8="9";
var key9="7";

var mod=0;
var token="";
var tempId=id;

for(var temp=0; temp < id.length; temp++)
{
    mod=tempId % 10;
    tempId=tempId/10;
    tempId=Math.floor(tempId);
console.log(mod);
console.log(tempId);
    if(mod == 0)
    token=token+key0;
    else if(mod==1)
    token=token+key1;
    else if(mod==2)
    token=token+key2;
    else if(mod==3)
    token=token+key3;
    else if(mod==4)
    token=token+key4;
    else if(mod==5)
    token=token+key5;
    else if(mod==6)
    token=token+key6;
    else if(mod==7)
    token=token+key7;
    else if(mod==8)
    token=token+key8;
    else if(mod==9)
    token=token+key9;
}
console.log(token);
return token;
  }catch(error)
  {
    console.error(error);
  }
}

function approverMasking(token){
try{
  var approverMasking = tokenVerify(token);
  var val=Math.floor(Math.random() * 10);
  var val1=Math.floor(Math.random() * 10);
  //var val = Math.floor(1000 + Math.random() * 9000);
  console.log(val);
   var result= "1"+val1+approverMasking+val;
   console.log(result);
  return approvalToken(result);
}
  catch(error)
      {
        console.error(error);
      }

}

function tokenVerify(token){
  try{
  var key0="6";
  var key1="4";
  var key2="1";
  var key3="7";
  var key4="3";
  var key5="2";
  var key6="5";
  var key7="9";
  var key8="0";
  var key9="8";
console.log(token);
var str = token.replace(/[&\/\\#,+()$~%.'":*@?<>{}]/g, '');
console.log(str);
var strArray=[];
var result="";
strArray=str.split("");

for(var char=0;char < strArray.length;char++)
{

        var temp="key"+strArray[char];

        if(temp == 'key7')
            result=result+key7;
        else if(temp == "key6")
            result= result+key6; 
        else if(temp == "key5")
            result= result+key5;
        else if(temp == "key4")
            result= result+key4;
        else if(temp == "key3")
            result= result+key3;
        else if(temp == "key2")
            result= result+key2;
        else if(temp == "key1")
            result= result+key1;
        else if(temp == "key0")
            result= result+key0;
        else if(temp == "key8")
            result= result+key8;
        else if(temp == "key9")
            result= result+key9;  

    }
    console.log(result.split('').reverse().join(''));

//return result.split('').reverse().join('');
return result;
  }catch(error)
  {
    console.error(error);
  }
}

app.post("/OddHoursApproval",function(req, response) {
  try{
  console.log("visitorId"+req.body.visitor_id);
  console.log("escort_id"+req.body.escort_id);
  var approverId=req.body.getToken.split('');
  var getVerifiedToken=tokenVerify(req.body.getToken.split('').reverse().join(''));
  var verifyAgain=tokenVerify(getVerifiedToken.split('').reverse().join(''));
  console.log("verifyAgain"+verifyAgain);
  var timeDiff="";
  

getTimeStamp(req.body.visitor_id,function(timeStamp){
console.log("savedTime: "+timeStamp);
    var currentTimestamp= Math.floor(Date.now() / 1000);

    timeDiff=currentTimestamp-timeStamp;
console.log("currentTime: "+currentTimestamp);

    con.query('delete from otp_table WHERE Id= ?',[req.body.escort_id],function(err, res)     
    {                                                      
      if (err)
        throw err;
        console.log(res);
       // response.send(true);
    });
  });

   var id="";
   var escortLength=req.body.escort_id.length;
   var actualId=verifyAgain.split('');
   
   for(var i=1;i<=escortLength;i++)
  {
     id = id+""+actualId[i];
  }
   console.log("approverIdtemp"+id);
  

console.log("timeDiff: "+timeDiff);
if(timeDiff < 10*60)
{
  
  if(id.includes(req.body.escort_id))
  {
    
    var approvalStatus="";
  
      getApproverDetail(approverId[0],function(roleName){
        
        if(roleName != "GL")
        {

           
                    approvalStatus="Pending at GL";
                }
                else{
                    approvalStatus="Approved";
                }

                if(req.body.groupId != "Individual")
                {
                    console.log("req.body.groupId"+req.body.groupId);
                    groupApproval(req.body.groupId,"Approved",approverId[0],function(res){
                     if(res){
                         response.send(true);
                        }
                     else{
                        response.send(false);
                     }
                     });
                 }
                 else{
                    con.query('UPDATE VisiterRecord SET approvalStatus= ?,ApproverRole_Id=? WHERE Id= ?',[approvalStatus,approverId[0],req.body.visitor_id],function(err, res)     
                          {                                                      
                    if (err)
                    {          
                        throw err;

                    }
                   
                    else{
                        response.send(false);
                    }

                });
            }
            });

        }
        else{
            response.send(false);


        }
    }
    else{
        response.send(false);

    }
}catch(error){
    console.error(error);
}
});



 function getApproverDetail(approverId,callback){
   try{
  con.query('select Role_Name from approver_table WHERE Role_Id= ?',[approverId],function(err, res)
  {                                                      
    if (err)
    {
      throw err;
      //callback(false);

    }
    else{
      
      console.log("approverName: "+res[0].Role_Name);
      callback(res[0].Role_Name);
    }
      
  });
  }catch(error)
  {
    console.error(error);
  }
 }

 function getTimeStamp(Id,callback){
   try{
  con.query('select timeStamp from otp_table WHERE Id= ?',[Id],function(err, res)
  {                                                      
    if (err)
    {
      throw err;
      //callback(0);

    }
    else{
      
      console.log("timeStamp: "+res.length);
      if(res.length >0)
      {
      callback(res[0].timeStamp);
      }
      else{
        callback(res.length)
      }
    }
      
  });
}catch(error)
{
  console.error(error);
}
 }

function groupApproval(groupId,status,ApproverRoleId,callback){
  try{
console.log(groupId);
console.log(status);
console.log(ApproverRoleId);

    con.query('UPDATE VisiterRecord SET approvalStatus=?,ApproverRole_Id=? WHERE groupId= ?',[status,ApproverRoleId,groupId],function(err,result){

        if(err){
            throw err;

        }
        else{
            callback(true);
        }


  });
  }catch(error)
  {
    console.error(error);
  }

}

function callelse(result,id,name,visitor_company,project,card,
  visitor_access,visitor_asset,visitor_purpose,
  escort_empid,escort_name,escort_unit,
  escort_smartcard,escort_date,escort_time_from,
  escort_time_to,identification,escort_signature
  ,visitor_signature,area, Hall, groupId,escort_empid,escort_name
  ,escort_unit,escort_smartcard,escort_date,escort_time_from,escort_time_to
  ,identification,escort_signature,visitor_signature,area, 
  Hall, groupId,escort_signature_JSON,visitor_signature_JSON){
   var approvalStatus="pending";
   var dayCount=result[0].count+1;
   var sql = "Insert into VisiterRecord (visitor_empid,visitor_name,visitor_company,visitor_unit,visitor_smartcard,visitor_access,visitor_assetId,visitor_purpose,escort_empid,escort_name,escort_unit,escort_smartcard,escort_date,escort_time_from,escort_time_to,approvalStatus,dayCount,Identification,Hall,groupId,area,visitor_signature,escort_signature,persontomeet,areaofvisit,projectofvisit) VALUES ('"+id+"','"+name+"','"+visitor_company+"','"+project+"','"+card+"','"+visitor_access+"','"+visitor_asset+"','"+visitor_purpose+"','"+escort_empid+"','"+escort_name+"','"+escort_unit+"','"+escort_smartcard+"',"+escort_date+","+escort_time_from+",'"+escort_time_to+"','"+approvalStatus+"','"+dayCount+"','"+identification+"','"+Hall+"','"+groupId+"','"+area+"','"+visitor_signature_JSON+"','"+escort_signature_JSON+"','"+txt_whom_to_meet +"','"+txt_purpose_escort_unit+"','"+txt_project+"') ";
   console.log(sql);
   con.query(sql,function(err, result)     
             {                                                      
       if (err)
           throw err;
       else{
           var sql1 = "Insert into escort_signature (escort_Id,escort_Name,Signature,visitor_Id,visitor_name,visitor_cardNo,Date) VALUES ('"+escort_empid+"','"+escort_name+"','"+escort_signature+"','"+id+"','"+name+"','"+card+"',"+escort_date+")";
           console.log(sql1)
           con.query(sql1,function(err, result)     
                     {                                                      
               if (err)
                   throw err;

           });
           var sql2 = "Insert into visitor_signature (visitor_name,Signature,visitor_cardNo,Date) VALUES ('"+name+"','"+visitor_signature+"','"+card+"',"+escort_date+")";
           console.log(sql2)
           con.query(sql2,function(err, result)     
                     {                                                      
               if (err)
                   throw err;

           });
       }
   });
   // res.render('Visitor_Status', {layout: true});
   return true;
}
function call(id,name,visitor_company,visitor_unit,card,
  visitor_access,visitor_asset,visitor_purpose,
  escort_empid,escort_name,escort_unit,escort_smartcard,escort_date,
  escort_time_from,escort_time_to,identification,escort_signature
  ,visitor_signature,
  area, 
  Hall, 
  groupId,
  escort_empid,
  escort_name,escort_unit,escort_smartcard,escort_date,escort_time_from,escort_time_to,
  identification,escort_signature,visitor_signature,area, Hall, groupId,escort_signature_JSON,
  visitor_signature_JSON,txt_whom_to_meet,txt_purpose_escort_unit,txt_project){
   var approvalStatus="pending";

   var dayCount=1;

   var sql = "Insert into VisiterRecord (visitor_empid,visitor_name,visitor_company,visitor_unit,visitor_smartcard,visitor_access,visitor_assetId,visitor_purpose,escort_empid,escort_name,escort_unit,escort_smartcard,escort_date,escort_time_from,escort_time_to,approvalStatus,dayCount,Identification,Hall,groupId,area,visitor_signature,escort_signature,persontomeet,areaofvisit,projectofvisit) VALUES ('"+id+"','"+name+"','"+visitor_company+"','"+visitor_unit+"','"+card+"','"+visitor_access+"','"+visitor_asset+"','"+visitor_purpose+"','"+escort_empid+"','"+escort_name+"','"+escort_unit+"','"+escort_smartcard+"',"+escort_date+","+escort_time_from+",'"+escort_time_to+"','"+approvalStatus+"','"+dayCount+"','"+identification+"','"+Hall+"','"+groupId+"','"+area+"','"+visitor_signature_JSON+"','"+escort_signature_JSON+"','"+txt_whom_to_meet +"','"+txt_purpose_escort_unit+"','"+txt_project+"') ";
   console.log(sql);
   con.query(sql,function(err, result)     
             {                                                      
       if (err)
           throw err;
       else{
           var sql1 = "Insert into escort_signature (escort_Id,escort_Name,Signature,visitor_Id,visitor_name,visitor_cardNo,Date) VALUES ('"+escort_empid+"','"+escort_name+"','"+escort_signature+"','"+id+"','"+name+"','"+card+"',"+escort_date+")";
           console.log(sql1);
           con.query(sql1,function(err, result)     
                     {                                                      
               if (err)
                   throw err;

           });
           var sql2 = "Insert into visitor_signature (visitor_name,Signature,visitor_cardNo,Date) VALUES ('"+name+"','"+escort_signature+"','"+card+"',"+escort_date+")";
           console.log(sql2);
           con.query(sql2,function(err, result)     
                     {                                                      
               if (err)
                   throw err;

           });
       }

   });


   // res.render('Visitor_Status', {layout: true});

   return true;
}
function check(id,name,visitor_company,project,card,visitor_access,visitor_asset,visitor_purpose,
  escort_empid,escort_name,escort_unit,escort_smartcard,escort_date,escort_time_from,
  escort_time_to,identification,escort_signature,visitor_signature, area, Hall, groupId,escort_signature_JSON
  ,visitor_signature_JSON,txt_whom_to_meet,txt_purpose_escort_unit,txt_project){
   console.log(id);
   var getId="select * from VisiterRecord where visitor_empid="+id ;
   con.query(getId,function(err, result,fields)   
             {     
       //  console.log("Test:"+result);
       var diffDays=8;

       if (err)
           throw err;
       else{ 
          // var secondDate= new Date((escort_date).toString() ); 
          // if(result.length >0)
         //  {
          //     console.log("HelloEnter");
          //     var diffDays = parseInt((secondDate - result[result.length-1].escort_date) / (1000 * 60 * 60 * 24));
         //  }
           if(result.length >0 && visitor_access == "Permanent" && visitor_company == "Tata Consultancy Services (TCS)" && visitor_purpose=="New Joinee")// && diffDays < 8)
           {
               con.query("select count(*) as count from VisiterRecord where DATEDIFF("+escort_date+",escort_date) < 8 and visitor_empid="+id,function(err, result)     
                         {  
                   //console.log(result);                                                    
                   if (err)
                       throw err;
                   else if(result[0].count < 3)
                   {
                       callelse(result,id,name,visitor_company,project,card,visitor_access,visitor_asset,visitor_purpose,escort_empid,escort_name,escort_unit,escort_smartcard,escort_date,escort_time_from,escort_time_to,identification,escort_signature,visitor_signature,area, Hall, groupId,escort_signature_JSON,visitor_signature_JSON,txt_whom_to_meet,txt_purpose_escort_unit,txt_project);
                       // res.render('Visitor_Status', {layout: true});
                       return true;

                   }
                   else{

                       // res.render('SubmitResponse', {layout: true});
                       return false;
                   }

               });

               //    if(result[result.length-1].dayCount <3 )
               //    {
               //   console.log("if");
               //   //var updateRecord="update VisiterRecord set dayCount=dayCount+1 where visitor_empid="+req.body.visitor_empid+ "and dayCount < 3";
               //   con.query('UPDATE VisiterRecord SET dayCount= dayCount+1 WHERE visitor_empid= ? and dayCount=?',[req.body.visitor_empid,result[result.length-1].dayCount],function(err, result)     
               //   {                                                      
               //     if (err)
               //       throw err;
               //       console.log(result);

               //   });
               //    res.render('Status', {layout: true});
               //   }
               // else{
               //   res.render('SubmitResponse', {layout: true});

               //     }

           }
           else
           {
               call(id,name,visitor_company,project,card,visitor_access,visitor_asset,visitor_purpose,escort_empid,escort_name,escort_unit,escort_smartcard,escort_date,escort_time_from,escort_time_to,identification,escort_signature,visitor_signature,area, Hall, groupId,escort_empid,escort_name,escort_unit,escort_smartcard,escort_date,escort_time_from,escort_time_to,identification,escort_signature,visitor_signature,area, Hall, groupId,escort_signature_JSON,visitor_signature_JSON,txt_whom_to_meet,txt_purpose_escort_unit,txt_project);
           }

       }

   });

}



module.exports=app;

