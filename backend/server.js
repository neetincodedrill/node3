const http = require('http');
const MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/'
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

const requestHandler = (req,res) => {
    if(req.method === 'POST'){
        var data 
        jsonParser(req,res,(err) => {
        MongoClient.connect(url,function(err,db){
            if(err) throw err;
            var dbo = db.db('mydb');
             data = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                age: req.body.age,
                gender: req.body.gender,
                city: req.body.city,
                email:req.body.email,
            }
            console.log(data)
            dbo.collection('user').insertOne(data,
            function(err,result){
                if(err) throw err;
                res.writeHead(200,"OK",{'Content-Type':'multipart/form-data'})
                console.log(result)
            }    
            )
        })
     })
     res.end('User data collected')
    }  
    else{
        console.log('GET request')
        
    }
}

const server =  http.createServer(requestHandler)

const port = 7000;
const host = 'localhost';
server.listen(port,host)
console.log(`Server is running at localhost:${port}`)