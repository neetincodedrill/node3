var MongoClient = require('mongodb').MongoClient;
var Binary = require('mongodb').Binary;
var http = require('http');
var fs = require('fs');

http.createServer(function(req,res){
    if(req.method === 'POST'){
        MongoClient.connect('mongodb://localhost:27017/mydb',function(err,db){
    if(err){
        console.log('Please check your db commection parameters')
    }else{
        console.log('Connection success')
        // var data = fs.readFileSync(file_path);
        var insert_data = {};
        insert_data.file_data = Binary(data);
        var collection = db.collection('user');
        collection.insertOne(insert_data,function(err,result){
            if(err) throw err;
            console.log(result)
        })
    }
  
})
    }
    res.writeHead(200,"Ok",{'Content-Type':'multipart/form-data'})
    res.end('Data uploaded')
}).listen(4000)
