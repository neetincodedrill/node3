const http = require('http');
const mongoclient = require('mongodb').MongoClient;   
const bodyParser = require('body-parser');
var url = "mongodb://localhost:27017/"

//middleware
var jsonParser = bodyParser.json()

const server = http.createServer(requestHandler);
function requestHandler(req,res){ 
    if (req.method === 'GET' && req.url === "/") {
        mongoclient.connect(url,function(err,db){
            if(err) throw err;
            var dbo = db.db('records');
            dbo.collection('address').findOne({},function(err,result){
                if(err) throw err;
                console.log(result);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(result));
            })
        
        })     
    }else if(req.method === 'GET' && req.url === "/alluser"){
        mongoclient.connect(url,function(err,db){
            if(err) throw err;
            var dbo = db.db('records');
            dbo.collection('address').find({}).toArray(function(err,result){
                if(err) throw err;
                console.log(result);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(result));
            })   
        })     
    }else if(req.method === 'POST' && req.url === "/user"){
        
        mongoclient.connect(url,jsonParser,function(err,db){
            if(err) throw err;
            console.log(req.body)
            var myObj  = req.body;
            var dbo = db.db('records');
            dbo.collection('user').insertOne(myObj,function(err,result){
                if(err) throw err;
                console.log(result);
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.end(result)
            })
        })
    }
}


const port = 8080;
const host = 'localhost';
server.listen(port,host)
console.log(`Server is running at localhost:${port}`)