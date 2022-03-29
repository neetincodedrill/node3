var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/'
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

http.createServer(function(req,res){
    if(req.method === 'POST'){  
    var form = new formidable.IncomingForm();
    var data
    var file
    form.parse(req,function(err,fields,files){
        console.log(files)
        file=files
    })
    console.log(file)
    jsonParser(req,res,(err) => {
       data = {
           first_name: req.body.first_name,
           last_name: req.body.last_name,
           age: req.body.age,
           gender:req.body.gender,
           city:req.body.city,
           email:req.body.email,
       }
       console.log(data)
       MongoClient.connect(url,function(err,db){
           if(err) throw  err;
           var dbo = db.db('mydb');
           dbo.collection('user').insertOne(data,
           function(err,result){
               if(err) throw err;
               res.writeHead(200,"Ok",{'Content-Type':'multipart/form-data'})
               console.log(result)
           })
       })
    })   
    }
     res.end('User data collected')
  
}).listen(8080)