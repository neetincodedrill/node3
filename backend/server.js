const http = require('http');
const MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/'
const bodyParser = require('body-parser');
var formidable = require('formidable');
var jsonParser = bodyParser.json();

const requestHandler = (req,res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    // res.setHeader('Content-Type','multipart/form-data')
    
    if(req.method === 'POST'){
        // let form=new formidable.IncomingForm();    
        jsonParser(req,res,(err) => {
        // form.parse(req,function(err,fields,files){
        MongoClient.connect(url,function(err,db){
            if(err) throw err;
            var dbo = db.db('mydb');
            var  data = {
                // image:files,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                age: req.body.age,
                gender: req.body.gender,
                city: req.body.city,
                email:req.body.email
            }
            console.log(data)
            if(data.first_name && data.last_name && data.age && data.gender && data.city && data.email&& data.image){
                return  dbo.collection('user').insertOne(data,
                    function(err,result){        
                        console.log(result)
                        if(err){
                            console.log(err)
                        }else{
                            res.writeHead(200,"ok")
                            res.write(result)
                        }
                    })
               }          
            })
        })
        // })
    res.end('User data collected')
    }
}

const server =  http.createServer(requestHandler)

const port = 7000;
const host = 'localhost';
server.listen(port,host)
console.log(`Server is running at localhost:${port}`)