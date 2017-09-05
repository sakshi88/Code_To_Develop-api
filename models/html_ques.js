var router=require('express').Router(),
	connection=require('../connection'),
	sequelize=connection.sequelize;

var html_ques=connection.seq.define('html_ques',{
	ques:{
		type: sequelize.STRING,
		allowNull: false
	},
	option1:{
		type: sequelize.STRING,
		allowNull: false
	},
	option2: {
		type:sequelize.STRING,
		allowNull: false
	},
	option3: {
		type: sequelize.STRING,
		allowNull: false
	}
},{
	freezeTableName: true,
	timeStamps: true,
})

html_ques.sync();

module.exports=router;

router.post('/addHMTLQues',function(req,res){
	databody= req.body;

	html_ques.create({
		ques: databody.ques,
		option1: databody.option1,
		option2: databody.option2,
		option3: databody.option3
	}).then(function(response){
		console.log("ques saved");
		res.send("ques saved");
	})
})

router.get('/getFirst5Ques',function(req,res){
	html_ques.findAll({
		limit: 5
	}).then(function(response){
		console.log(response);
		res.send(response);
	})
})

router.get('/getSecond5Ques',function(req,res){
	html_ques.findAll({
		limit: 5,
		offset: 5
	}).then(function(response){
		console.log(response);
		res.send(response);
	})
})

router.get('/getThird5Ques',function(req,res){
	html_ques.findAll({
		limit: 5,
		offset: 10
	}).then(function(response){
		console.log(response);
		res.send(response);
	})
})

router.get('/getFourth5Ques',function(req,res){
	html_ques.findAll({
		limit: 5,
		offset: 15
	}).then(function(response){
		console.log(response);
		res.send(response);
	})
})

router.get('/getFifth5Ques',function(req,res){
	html_ques.findAll({
		limit: 5,
		offset: 20
	}).then(function(response){
		console.log(response);
		res.send(response);
	})
})