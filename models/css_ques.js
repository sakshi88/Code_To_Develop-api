var router=require('express').Router();
var connection=require('../connection');
var sequelize=connection.sequelize;

var css_ques=connection.seq.define('css_ques',{
	ques: {
		type: sequelize.STRING,
		allowNull: false
	},
	option1: {
		type: sequelize.STRING,
		allowNull: false
	},
	option2: {
		type: sequelize.STRING,
		allowNull: false
	},
	option3: {
		type: sequelize.STRING,
		allowNull: false
	},
	option4: {
		type: sequelize.STRING,
		allowNull: false
	}
},{
	freezeTableName: true,
	timeStamps: true
})

css_ques.sync();

router.post('/save_css_ques',function(req,res){
	databody=req.body;

	css_ques.create({
		ques: databody.ques,
		option1: databody.option1,
		option2: databody.option2,
		option3: databody.option3,
		option4: databody.option4
	}).then(function(resonse){
		console.log("ques saved");
		res.send("ques saved");
	})
})

router.get('/getFirst5CssQues',function(req,res){

	css_ques.findAll({
		limit:5
	}).then(function(response){
		console.log(response);
		res.send(response);
	})
})

router.get('/getSecond5CssQues',function(req,res){

	css_ques.findAll({
		limit:5,
		offset: 5
	}).then(function(response){
		console.log(response);
		res.send(response);
	})
})

router.get('/getThird5CssQues',function(req,res){

	css_ques.findAll({
		limit:5,
		offset: 10
	}).then(function(response){
		console.log(response);
		res.send(response);
	})
})
module.exports=router;