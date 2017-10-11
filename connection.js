var sequelize=require('sequelize');
var seq=new sequelize('code_to_develop','root','sakshi',{
	host: 'localhost',
	dialect: 'mysql',
	pool:{
		max: 15,
		min: 0,
		idle: 1000
	}
})

module.exports={
	sequelize: sequelize,
	seq: seq
}