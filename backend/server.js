const http = require('http');
const mongoclient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/mydb'

// mongoclient.connect(url,function(err,db){
//     if(err){
//         console.log(err)
//     }else{
//         console.log('Mongodb database connected')
//     }
// })

var db = mongoclient.connect(url)

const server = http.createServer((req,res) => {
    if(req.method === 'POST'){
        console.log('Post request')
        db.createCollection('students',function(err,data){
            if(err) throw err;
            console.log('Collection created')
        })
    }else{
        console.log('get Method')
    }
})

const port = 8000;
const host = 'localhost';
server.listen(port,host)
console.log(`Server is running at localhost:${port}`)

