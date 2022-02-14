'use strict';
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const handlebars=require('express-handlebars');
//const crud=require('crud');
const app=express();
app.use(cors());
//const urlencodeParser=express.urlencoded({extended:false});
app.use(express.urlencoded({ extended: true }))
let port=process.env.PORT || 3000;
//let cruds=new crud();

//Template engine
app.engine("handlebars",handlebars({defaultLayout:'main'}));
app.set('view engine','handlebars');
app.use('/css',express.static('css'));
app.use('/js',express.static('js'));
app.use('/img',express.static('img'));

//Routes and Templates
app.get("/",function(req,res){
    //res.sendFile(__dirname+"/index.html");
    res.render('index');
});
app.get("/login",function(req,res){res.render('login');});
app.get("/inserir",function(req,res){res.render('inserir');});
app.get("/select/:id?",function(req,res){cruds.read(req,res);});
app.post("/controllerForm",/*urlencodeParser,*/function(req,res){console.log(req.body); /*cruds.create(req,res);*/});
app.get("/deletar/:id",function(req,res){cruds.deletes(req,res);});
app.get("/update/:id",function(req,res){cruds.update(req,res);});
app.post("/controllerUpdate",/*urlencodeParser,*/function(req,res){cruds.update(req,res,'controller')});

//Start server
app.listen(port);