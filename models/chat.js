module.exports = function( sequelize, DataTypes){
	return sequelize.define('chat', {
		name: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				len: [1, 20]
			}
		},
		phoneNumber:{
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 123456789		
		  },
		 message:{
		 	type: DataTypes.STRING,
		 	allownull: true
		 } 		
	});
};