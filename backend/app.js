var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/'
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

http.createServer(function(req,res){
    if(req.method === 'POST'){  
    //     jsonParser(req,res,(err) => {
    //     var form = new formidable.IncomingForm();
    //     form.parse(req,function(err,fields,files){
    //         MongoClient.connect(url,function(err,db){
    //             if(err) throw err;
    //             var dbo = db.db('mydb'); 
    //             let data = {
    //                 first_name: req.body.first_name,
    //                 last_name: req.body.last_name,
    //                 age: req.body.age,
    //                 gender: req.body.gender,
    //                 city: req.body.city,
    //                 email:req.body.email,
    //                 file:files
    //             }   
    //             dbo.collection('user').insertOne(data,
    //             function(err,result){
    //                 if(err) throw err;
    //                 res.writeHead(200,"OK",{'Content-Type':'multipart/form-data'})
    //             })
    //         })
    //     })
    // })
    var form = new formidable.IncomingForm();
    let data
    var file
    // form.parse(req,function(err,fields,files){
    //     console.log(files)
    //     file=files
    // })
    // console.log(file)
    jsonParser(req,res,(err) => {
       data = {
           first_name: req.fields.first_name,
           last_name: req.fields.last_name,
           age: req.fields.age,
           gender:req.fields.gender,
           city:req.fields.city,
           email:req.fields.email,
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

   
   
        // MongoClient.connect(url,function(err,db){
        //     if(err) throw err;
        //     // var file = [];
        //     // var form = new formidable.IncomingForm();
        //     // form.parse(req,function(err,fields,files){
        //     //      file += files
        //     // })
        //     var dbo = db.db('mydb');
        //     let data = {
        //         first_name: req.body.first_name,
        //         last_name: req.body.last_name,
        //         age:req.body.age,
        //         gender: req.body.gender,
        //         city: req.body.city,
        //         email: req.body.email,
        //         file : req.file
        //     }
        //     dbo.collection('user').insertOne(data,
        //         function(err,result){
        //             if(err) throw err;
        //             res.writeHead(200,"OK",{'Content-Type':'multipart/form-data'})
        //             console.log(result)
        //         })
        // })     
    
    }
     res.end('User data collected')
    // if(req.url == '/fileupload'){
    //     var form = new formidable.IncomingForm();
    //     form.parse(req,function(err,fields,files){
    //         console.log(files)
    //         var oldpath = files.filepath;
    //         var newpath = "/images/" + files.originalFilename;
    //         fs.rename(oldpath,newpath,function(err){
    //             if (err) throw err;
    //             res.write('file uploaded');
    //             res.end("/" + newpath);
    //         })  
    //         // res.write('file uploaded');
    //         //     res.end();
    //     })
    // }
}).listen(8080)