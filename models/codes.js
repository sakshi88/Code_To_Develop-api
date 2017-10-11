var router=require('express').Router(),
connection=require('../connection'),
sequelize=connection.sequelize,
codes=connection.seq.define('codes',{
	code_type:{
		type:sequelize.STRING,
		allowNull:false
	},
	heading:{
		type:sequelize.STRING,
		allowNull:false
	},
	codeContent:{
		type:sequelize.STRING,
		allowNull:false
	},
	desp:{
		type:sequelize.STRING,
		allowNull:false
	}
},
{
	freezeTableName:true,
	timestamps:true,
})

codes.sync();

router.post('/addCode',function(req,res){
	data_body=req.body;
	codes.create({
		code_type:data_body.code_type,
		heading:data_body.heading,
		codeContent:data_body.codeContent,
		desp:data_body.desp,
	}).then((response)=>{
		res.send("OKATTTTTT");
	})
})

router.post('/getjavaHeading',function(req,res){
	data_body=req.body;
	codes.findAll({
		where:{
			code_type:data_body.code_type
		}
	}).then((response)=>{
		res.send(response);
	})
})

router.post('/getdesiredCode',function(req,res){
	data_body=req.body;
	codes.find({
		where:{
			heading:data_body.heading
		}
	}).then((response)=>{
		res.send(response);
	})
})

router.post('/getRecentcodes',function(req,res)
{
	databody=req.body;
	codes.findAll({
		limit:5,
		order:[['updatedAt','DESC']]
	}).then((response)=>{
		res.send(response);
	})
})

router.post('/findTotalcode',function(req,res){
	codes.findAll({
		order:[['id','DESC']],
		limit:1
	}).then((response)=>{
		res.send(response);
	})
})
module.exports=router;

