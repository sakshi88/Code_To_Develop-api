var router=require('express').Router(),
nodemailer=require('nodemailer'),
connection=require('../connection'),
wellknown = require('nodemailer-wellknown'),
sequelize=connection.sequelize,

signup=connection.seq.define('signup',{
	email:{
		type:sequelize.STRING,
		allowNull:false
	},
	fullname:{
		type:sequelize.STRING,
		allowNull:false
	},
	password:{
		type:sequelize.STRING,
		allowNull:false
	},
	confirm_password:{
		type:sequelize.STRING,
		allowNull:false
	}
},
{
	freezeTableName:true,
	timestamps:true,
})
signup.sync();
router.get('/all_users',function(req,res){
	signup.findAll().then((response)=>{
		console.log(response);
		res.send(response);
	});
});
router.post('/usersignup',function(req,res){
	data_body=req.body;
	signup.find({
		where:{
			email:data_body.email
		}
	}).then((response)=>{
		if(response)
		{
			res.send("false");

		}
		else
		{
			signup.create({
				email:data_body.email,
				fullname:data_body.fullname,
				password:data_body.password,
				confirm_password:data_body.confirm_password
			}).then((response)=>{
				res.send("true");

			})
		}
	})
	
})
router.post('/usersignin',function(req,res){
	data_body=req.body;
	signup.find({
		where:{
			email:data_body.email
		}
	}).then((response)=>{
		if(response)
		{
			res.send(response.password);
		}
		else
		{
			res.send("");
		}
	})
})

router.post('/findTotaluser',function(req,res){
	signup.findAll({
		order:[['id','DESC']],
		limit:1
	}).then((response)=>{
		res.send(response);
	})
})

router.post('/checkAUser',function(req,res){
	data_body=req.body;
	signup.find({
		where:{
			email: data_body.email
		}
	}).then(function(response){
		console.log(response);
		res.send(response);
	})
})

router.post('/deleteAUser',function(req,res){
	data_body=req.body;
	signup.destroy({
		where: {
			email: data_body.email
		}
	}).then(function(response){
		console.log("user deleted");
		res.send("user deleted");
	})
})

module.exports=router;