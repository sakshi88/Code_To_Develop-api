var router=require('express').Router(),
	connection=require('../connection'),
	sequelize=connection.sequelize;

var testQues=connection.seq.define('testQues',{
	language:{
		type: sequelize.STRING,
		allowNull: false
	},
	question:{
		type: sequelize.STRING,
		allowNull: false
	},
	option1:{
		type: sequelize.STRING,
		allowNull: false
	},
	option2:{
		type:sequelize.STRING,
		allowNull: false
	},
	option3: {
		type:sequelize.STRING,
		allowNull:false
	},
	option4:{
		type:sequelize.STRING,
		allowNull: false
	}
},{
	freezeTableName: true,
	timestamps: true
})

testQues.sync();

router.post('/addQues',function(req,res){
	databody=req.body;
	testQues.create({
		language: databody.language,
		question: databody.question,
		option1: databody.option1,
		option2: databody.option2,
		option3: databody.option3,
		option4: databody.option4
	}).then(function(response){
		res.send("Question Added");
	})
});

router.post('/getLatestQuesAdded',function(req,res){
	databody=req.body;
	testQues.findAll({
		where:{
			language: databody.language,
		},
		limit:20,
		order:[['updatedAt','DESC']]
	}).then(function(response){
		console.log(response);
		res.send(response);
	})
})

module.exports=router;