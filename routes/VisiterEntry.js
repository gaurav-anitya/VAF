var express = require('express');
var bodyParser = require('body-parser');
const app = express.Router();

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

app.post('/submit', function(req, res) {
 console.log(req.body);
if(req.body.visitor_company == "Other")  
{
  req.body.visitor_company=req.body.visitor_company_other;
}
console.log("NewSignature:"+req.body.escort_signature);
if(req.body.escort_signature != "")
{
req.body.escort_signature="Y";
console.log("sign:"+req.body.escort_signature)
}

var escort = "select * from escort_table where escort_Id="+req.body.escort_empid;
                con.query(escort,function(err, result)     
                {                                                      
                 if (err)
                   throw err;
                   req.body.escort_name=result[0].escort_Name;
                   req.body.escort_unit=result[0].project;
                   req.body.escort_smartcard=result[0].smartCard;
             
               });

var identification="";

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

console.log(req.body.visitor_empid);
var getId="select * from VisiterRecord where visitor_empid="+req.body.visitor_empid ;
con.query(getId,function(err, result,fields)   
{     
  console.log("Test:"+result);
   var diffDays=8;
                                  
 if (err)
   throw err;
  else{ 
    var secondDate= new Date((req.body.escort_date).toString() ); 
    if(result.length >0)
    {
      console.log("HelloEnter");
      var diffDays = parseInt((secondDate - result[result.length-1].escort_date) / (1000 * 60 * 60 * 24));
    }
     if(result.length >0 && req.body.visitor_access == "Permanent" && req.body.visitor_company == "TCS" && req.body.visitor_purpose=="New Joinee" && diffDays < 8)
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
          var sql = "Insert into VisiterRecord (visitor_empid,visitor_name,visitor_company,visitor_unit,visitor_smartcard,visitor_access,visitor_assetId,visitor_purpose,escort_empid,escort_name,escort_unit,escort_smartcard,escort_date,escort_time_from,escort_time_to,approvalStatus,dayCount,Identification) VALUES ('"+req.body.visitor_empid+"','"+req.body.visitor_name+"','"+req.body.visitor_company+"','"+req.body.visitor_unit+"','"+req.body.visitor_smartcard+"','"+req.body.visitor_access+"','"+req.body.visitor_asset+"','"+req.body.visitor_purpose+"','"+req.body.escort_empid+"','"+req.body.escort_name+"','"+req.body.escort_unit+"','"+req.body.escort_smartcard+"','"+req.body.escort_date+"','"+req.body.escort_time_from+"','"+req.body.escort_time_to+"','"+approvalStatus+"','"+dayCount+"','"+identification+"') ";
          con.query(sql,function(err, result)     
          {                                                      
            if (err)
               throw err;
               else{
                var sql1 = "Insert into escort_signature (escort_Id,escort_Name,Signature,visitor_Id,visitor_name,visitor_cardNo,Date) VALUES ('"+req.body.escort_empid+"','"+req.body.escort_name+"','"+req.body.escort_signature+"','"+req.body.visitor_empid+"','"+req.body.visitor_name+"','"+req.body.visitor_smartcard+"','"+req.body.escort_date+"')";
                con.query(sql1,function(err, result)     
                {                                                      
                 if (err)
                   throw err;
             
               });
               var sql2 = "Insert into visitor_signature (visitor_name,Signature,visitor_cardNo,Date) VALUES ('"+req.body.visitor_name+"','"+req.body.visitor_signature+"','"+req.body.visitor_smartcard+"','"+req.body.escort_date+"')";
               con.query(sql2,function(err, result)     
               {                                                      
                if (err)
                  throw err;
            
              });
             }
          });
          res.render('Visitor_Status', {layout: true});
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
      
      var sql = "Insert into VisiterRecord (visitor_empid,visitor_name,visitor_company,visitor_unit,visitor_smartcard,visitor_access,visitor_assetId,visitor_purpose,escort_empid,escort_name,escort_unit,escort_smartcard,escort_date,escort_time_from,escort_time_to,approvalStatus,dayCount,Identification) VALUES ('"+req.body.visitor_empid+"','"+req.body.visitor_name+"','"+req.body.visitor_company+"','"+req.body.visitor_unit+"','"+req.body.visitor_smartcard+"','"+req.body.visitor_access+"','"+req.body.visitor_asset+"','"+req.body.visitor_purpose+"','"+req.body.escort_empid+"','"+req.body.escort_name+"','"+req.body.escort_unit+"','"+req.body.escort_smartcard+"','"+req.body.escort_date+"','"+req.body.escort_time_from+"','"+req.body.escort_time_to+"','"+approvalStatus+"','"+dayCount+"','"+identification+"') ";
      con.query(sql,function(err, result)     
      {                                                      
        if (err)
           throw err;
           else{
              var sql1 = "Insert into escort_signature (escort_Id,escort_Name,Signature,visitor_Id,visitor_name,visitor_cardNo,Date) VALUES ('"+req.body.escort_empid+"','"+req.body.escort_name+"','"+req.body.escort_signature+"','"+req.body.visitor_empid+"','"+req.body.visitor_name+"','"+req.body.visitor_smartcard+"','"+req.body.escort_date+"')";
              con.query(sql1,function(err, result)     
              {                                                      
               if (err)
                 throw err;
           
             });
             var sql2 = "Insert into visitor_signature (visitor_name,Signature,visitor_cardNo,Date) VALUES ('"+req.body.visitor_name+"','"+req.body.escort_signature+"','"+req.body.visitor_smartcard+"','"+req.body.escort_date+"')";
             con.query(sql2,function(err, result)     
             {                                                      
              if (err)
                throw err;
          
            });
           }
           
      });

      
      res.render('Visitor_Status', {layout: true});
   }
}
    
});

});

app.post("/getApprovalToken",function(req, res) {
console.log(req.body);

res.send(approvalToken(req.body.escort_id));
});

app.post("/verifyApprovalToken",function(req, res) {
  
  //console.log(approverMasking(req.body.token_key));
  res.send(approverMasking(req.body.token_key));
  });



app.post("/visitorApproved",function(req, response) {
  console.log("visitorId"+req.body.visitor_id);
  console.log("escort_id"+req.body.escort_id);
  var approverId=req.body.getToken.split('');
  console.log(approverId[0]);
  var getVerifiedToken=tokenVerify(req.body.getToken.split('').reverse().join(''));
  var verifyAgain=tokenVerify(getVerifiedToken.split('').reverse().join(''));
console.log(verifyAgain);
  if(verifyAgain.includes(req.body.escort_id))
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
      con.query('UPDATE VisiterRecord SET approvalStatus= "Approved",ApproverRole_Id=? WHERE Id= ?',[approverId[0],req.body.visitor_id],function(err, res)     
      {                                                      
        if (err)
          throw err;
          console.log(res);
          response.send(true);
      });
   }
  else{
    response.send(false);

    }
    });
  }
  else{
    response.send(false);


  }
  });

  app.post("/validateVisitor",function(req, res) {
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
    });

    app.post("/validateEscort",function(req, res) {
      console.log(req.body.escort_id);
      var getId="select * from escort_table where escort_Id="+req.body.escort_id;
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
      });



    app.post("/visitorRecord",function(req, res) {
          
          var getId="select * from VisiterRecord";
          con.query(getId, function (err, result,fields) {
            if (err) 
              throw err;
              console.log(result);
              res.send(JSON.stringify(result));
            
          });


          });

app.post("/updateOutTime",function(req, response){
console.log("updateOut");
console.log(req.body.visitor_id);
console.log(req.body.outTime);

  con.query('UPDATE VisiterRecord SET escort_time_to = ? WHERE Id= ?',[req.body.outTime,req.body.visitor_id],function(err, res)     
      {   
        console.log(res);                                                 
        if (err)
          throw err;
          response.send(true);
       
      });
});          

function approvalToken(id){
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

while(tempId != 0)
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

}

function approverMasking(token){

  var approverMasking = tokenVerify(token);
  var val=Math.floor(Math.random() * 10);
  var val1=Math.floor(Math.random() * 10);
  //var val = Math.floor(1000 + Math.random() * 9000);
  console.log(val);
   var result= "1"+val1+approverMasking+val;
   console.log(result);
  return approvalToken(result);

}

function tokenVerify(token){
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
}
module.exports=app;

