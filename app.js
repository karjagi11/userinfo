const fs = require("fs");
var express=require("express");
var bodyParser=require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/users');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
   console.log("connection succeeded");
})
var app=express()

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
   extended: true
}));

app.get("/login",function (req,res){
    return res.render('login.html'); 
})
app.get("/signup",function (req,res){
    return res.render('signup.html'); 
})
app.get("/index",function (req,res){
    return res.render('index.html'); 
})
app.post('/signup', function(req,res){
   var name = req.body.name;
   var email =req.body.email;
   var pass = req.body.password;
   var data = {
      "name": name,
      "email":email,
      "password":pass
   }
   db.collection('details').insertOne(data,function(err, collection){
   if (err) throw err;
      console.log("Record inserted Successfully");
   
   });
   return res.redirect('login.html');

})

app.get('/login',function(req,res){
   //  res.set({
   //     'Access-control-Allow-Origin': '*'
   //  });
    return res.redirect('login.html');
 }).listen(3000)

console.log("server listening at port 3000");



