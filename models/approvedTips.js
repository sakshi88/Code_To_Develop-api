var router=require('express').Router();
var	connection=require('../connection');
var nodemailer=require('nodemailer');
var wellknown = require('nodemailer-wellknown');
var	sequelize=connection.sequelize,
approvedTip=connection.seq.define('approvedTip',{
	tip_heading:{
		type: sequelize.STRING,
		allowNull: false
	},
	tip_content:{
		type: sequelize.STRING,
		allowNull: false
	},
	author_name:{
		type: sequelize.STRING,
		allowNull: false
	},
	tip_language: {
		type: sequelize.STRING,
		allowNull: false
	},
},	{
	freezeTableName: true,
	timestamps: true,
})
approvedTip.sync();

router.post('/addApprovedTips',function(req,res){
	databody=req.body;
	approvedTip.create({
		tip_heading:databody.tip_heading,
		tip_content:databody.tip_content,
		author_name:databody.author_name,
		tip_language:databody.tip_language
	}).then((response)=>{
		res.send("OK");
	})
})
router.post('/getFrontEndTips',function(req,res){
	databody=req.body;

	approvedTip.findAll({
		where:{
			tip_language: databody.tip_language
		}
	}).then(function(response){
		console.log(response);
		res.send(response);
	})
})

router.post('/getBackEndTips',function(req,res){
	databody=req.body;

	approvedTip.findAll({
		where:{
			tip_language: databody.tip_language
		}
	}).then(function(response){
		console.log(response);
		res.send(response);
	})
})

router.post('/getJavaTips',function(req,res){
	databody=req.body;

	approvedTip.findAll({
		where:{
			tip_language: databody.tip_language
		}
	}).then(function(response){
		console.log(response);
		res.send(response);
	})
})

router.post('/getRecentTips',function(req,res)
{
	databody=req.body;
	approvedTip.findAll({
		limit:5,
		order:[['updatedAt','DESC']]
	}).then((response)=>{
		res.send(response);
	})
})
router.post('/findTotaltip',function(req,res){
	approvedTip.findAll({
		order:[['id','DESC']],
		limit:1
	}).then((response)=>{
		res.send(response);
	})
})
module.exports=router;