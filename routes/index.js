var express = require('express'); 
const router = express.Router();
var visiter=require('./VisiterEntry');
var asset=require('./AssetEntry');

// router.get('/', function(req, res){
//     console.log("Hello");
//     res.render('firstPage', {layout: true});

// });

router.use('/',visiter);

router.get('/floorsetting',function(req,res){
    res.render('deviceRegistration', {layout: true});
    
});
router.get("/home",function(req, res) {

    res.render('secondPage', {layout: true});
});

router.get("/landing",function(req, res) {

    res.render('Landing', {layout: true});
});

router.get("/addVisitor",function(req, res) {

    res.render('Visitor_form', {layout: true});
});

router.get("/addVisitorold",function(req, res) {

    res.render('Visitor_formnew', {layout: true});
});
router.get("/visitorGrid",function(req, res) {

    res.render('Visitor_Status', {layout: true});
});

router.get("/status",function(req, res) {

    res.render('Status', {layout: true});
});

router.get("/escortDetails",function(req, res) {

    res.render('Escort_form', {layout: true});
});   

router.get("/assetauthorization",function(req, res) {
    console.log("test");
    res.render('asset_authorization_form', {layout: true});
}); 

router.post("/submit_asset", function(req,res){
    asset.insert_asset(req,res);
});

router.get("/", function(req,res){
    res.render('GuardLogin', {layout:true});
});
router.get("/gaurdlogin", function(req,res){
    res.render('Guard_Login', {layout:true});
});


module.exports=router;