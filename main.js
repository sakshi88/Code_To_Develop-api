var express=require('express');
var bodyparser=require('body-parser');
var app=express()

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.use(bodyparser.json())

app.use(bodyparser.urlencoded({
	extended: true
}))

app.get('/',function(req,res){
	res.send("Response ok");
})

app.use('/tip_submit',require('./models/tips.js'));

app.use('/htmlques',require('./models/html_ques.js'));

app.use('/cssques',require('./models/css_ques.js'));

app.listen(8000,function(){
	console.log("server listening at port 8000");
})