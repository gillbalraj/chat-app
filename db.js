var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/database/chat-history.sqlite'
});

var db = {};

db.chat = sequelize.import(__dirname + '/models/chat.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;