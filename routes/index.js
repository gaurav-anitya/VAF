var express = require('express'); 
const router = express.Router();
var visiter=require('./VisiterEntry');

router.get('/', function(req, res){
  console.log("Hello");
  res.render('Visitor_form', {layout: true});
  
});

router.use('/',visiter);

router.get("/visitorGrid",function(req, res) {
  
  res.render('List', {layout: true});;
  });

  router.get("/status",function(req, res) {
    
    res.render('Status', {layout: true});;
    });

 router.get("/escortDetails",function(req, res) {
    
      res.render('Escort_form', {layout: true});;
   });   
    
  

module.exports=router;