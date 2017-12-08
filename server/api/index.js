'use strict'
const apiRouter = require('express').Router()
const db = require('../db')
const {Campus, Student} = require('../db/models');
const bodyParser = require('body-parser');

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!
apiRouter.get('/hello', (req, res) => res.send({hello: 'world'}))

apiRouter.get('/campuses', (req, res, next) => {
	Campus.findAll()
	.then( campuses => res.send(campuses) )
	.catch(next)
} );

apiRouter.get('/students', (req, res, next) => {
	Student.findAll( { order: ['id'], include: [Campus] } )
	.then( students => {
		res.send(students)} )
	.catch();
});

apiRouter.get('/deletestudent/:studentid', (req, res, next) => {
	var studentid = Number(req.params.studentid);
	Student.destroy({ where: {id: studentid} })
	.then(status => res.send({status: 'DONT KNOW!!!!'}))
	.catch(err => console.log(err) )
});

apiRouter.get('cu', (req, res, next) => {
	// Campus.create({ campusName: "Titan" });
	// Campus.create( { campusName: "Europa" } );
	Student.create( {studentName: "Han", campusId: 1} )
	Student.create( {studentName: "Enid", campusId: 2} )
	Student.create( {studentName: "Lionel", campusId: 2} )
})
// You can put all routes in this file; HOWEVER, this file should almost be like a table of contents for the routers you create

module.exports = apiRouter;