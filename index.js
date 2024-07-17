//mongodb+srv://mongotut:<password>@cluster0.wotvjj1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
   extended:true
}))
mongoose.connect('mongodb://localhost:27017/Collection')
var db=mongoose.connection
db.on('error',()=> console.log("Error in Connecting to Database"))
db.once('open',()=>console.log("Connected to database"))

app.post("/Sign_up",(req,res)=> {
    var name = req.body.name
    var email=req.body.email
    var phoneNo= req.body.phoneNo
    var gender= req.body.gender
    var password = req.body.password


    var data = {
        "name":name,
        "email":email,
        "phoneNo":phoneNo,
        "gender":gender,
        "password":password
    }
    db.collection('users').insertOne(data,(err,collection) => {
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully")
    })
    return res.redirect('Signup_successful.html')

})
    
app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin":"*"
    })
    return res.redirect('index.html')
    }).listen(3000);

    console.log("Listening on port 3000")