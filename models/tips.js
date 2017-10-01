var router=require('express').Router();
var	connection=require('../connection');
var nodemailer=require('nodemailer');
var wellknown = require('nodemailer-wellknown');
var	sequelize=connection.sequelize,

tip_table=connection.seq.define('tip_table',{
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

},{
	freezeTableName: true,
	timestamps: true,
})

tip_table.sync();

router.post('/submit_tip',function(request,response){
	databody=request.body;
	console.log(databody);
	tip_table.create({
		tip_heading: databody.tip_heading,
		tip_content: databody.tip_content,
		tip_language: databody.tip_language,
		author_name: databody.author_name
	}).then(function(tipgiven){
		var transporter=nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: 'sakshi.kataria12@gmail.com',
				pass: 'hellobuddy'
			}
		});

		var mailoptions={
			to: 'sakshi.kataria12@gmail.com',
			from: 'sakshi.kataria12@gmail.com',
			subject: 'New tip from developer',
			html: "The following tip has come:" + "\n\n"+"<b>Tip heading</b>- "+ databody.tip_heading+"\n\n"+"<b>Tip Content</b>- "+databody.tip_content+"\n\n"+ "<b>Tip Language</b>- "+ databody.tip_language+"\n\n"+ "<b>Tip Author</b>- "+ databody.author_name 
		};

		transporter.sendMail(mailoptions,function(err,success){
			if(err)
			{
				console.log(err);
				console.log("Some error has occured");
			}
			else
			{
				console.log("mial has been sent");
			}
		});
		response.send(true);
		response.send("table created and mail sent");
	})
})
router.get('/getAllTips',function(req,res){
	tip_table.findAll().then((response)=>{
		res.send(response);
	})
})
router.post('/deleteOneTip',function(req,res){
	databody=req.body;
	tip_table.destroy({
		where:{
			tip_heading:databody.tip_heading
		}
	}).then((response)=>{
		res.send("Deleted on entry");
	})
})
module.exports=router;