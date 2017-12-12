'use strict';

const Sequelize = require("sequelize");
const db = require('../index');

// Require all the models
	// Running each model (i.e. table) module (i.e. file) registers each model into our sequelize db
	// This works if we all use the same Sequelize instance (instantiated in and exported from `/db/index.js`)
	// Exporting all models from here seems like a good idea!

// This is also probably a good place for you to set up your associations

const Campus = db.define('campus', {
	campusName: { type: Sequelize.STRING, allowNull: false, unique: true },
	imageUrl: Sequelize.STRING,
	description: Sequelize.TEXT
});

const Student = db.define('student', {
	firstName: { type: Sequelize.STRING, allowNull: false},
	lastName: { type: Sequelize.STRING, allowNull: false},
	email: { type: Sequelize.STRING},
	gpa: Sequelize.FLOAT
	////campusId: {type: Sequelize.INTEGER, allowNull: false}
});


Student.belongsTo(Campus);
Campus.hasMany(Student);

// Campus.create({ campusName: "Titan" });
// Campus.create( { campusName: "Europa" } );
//Student.create( {studentName: "Han", campusId: 1} )

module.exports = {db, Campus, Student}