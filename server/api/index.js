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
	.then( campuses => {
		res.send(campuses)
	} )
	.catch(next)
} );

apiRouter.get('/students', (req, res, next) => {
	Student.findAll( { order: ['id'], include: [Campus] } )
	.then( students => {
		res.send(students)} )
	.catch();
});

apiRouter.delete('/deletestudent/:studentid', (req, res, next) => {
	var studentid = Number(req.params.studentid);
	Student.destroy({ where: {id: studentid} })
	.then(status => res.send({status: 'DONT KNOW!!!!'}))
	.catch(err => console.log(err) )
});

apiRouter.delete('/deletecampus/:campusid', (req, res, next) => {
	var campusid = Number(req.params.campusid);
	Campus.destroy({ where: {id: campusid} })
	.then(status => res.send({status: 'DONT KNOW!!!!'}))
	.catch(err => console.log('delete campus errorrrrrrrrrrrrrr', err) )
});

apiRouter.get('cu', (req, res, next) => {
	// Campus.create({ campusName: "Titan" });
	// Campus.create( { campusName: "Europa" } );
	Student.create( {studentName: "Han", campusId: 1} )
	Student.create( {studentName: "Enid", campusId: 2} )
	Student.create( {studentName: "Poby", campusId: 2} )
	Student.create( {studentName: "Lionel", campusId: 2} )
})

apiRouter.get('/campusstudents/:campusid', (req, res, next) => {
	Student.findAll( {where: {campusId: req.params.campusid} } )
	.then(data => res.send(data) )
	.catch(next);
});

apiRouter.post('/addstudent', (req, res, next) => {
	Student.create( req.body )
	.then( response => res.send(response))
	.catch();
});

apiRouter.post('/addcampus', (req, res, next) => {
	Campus.create( req.body )
	.then(response => res.send(response) )
	.catch(err => console.log('add campus errorrrrrrrrrrr', err) );
} );

apiRouter.put('/updatestudent/:studentid', (req, res, next) => {
	Student.findById(req.params.studentid)
	.then(student => student.update(req.body) )
	.then(result => res.send(result) )
	.catch(err => console.log('updatestudent errorrrrrrrrr', err) )
});

apiRouter.put('/updatecampus/:campusid', (req, res, next) => {
	Campus.findById(req.params.campusid)
	.then(campus => campus.update(req.body) )
	.then(result => res.send(result) )
	.catch(err => console.log('updatecampus errorrrrrrrrr', err) )
});

apiRouter.put('/addstudenttocampus/:studentid/:campusid', (req, res, next) => {

	Student.findById(req.params.studentid)
	.then(student => student.update(req.body) )
	.then(result => res.send(result) )
	.catch(err => console.log('addstudenttocampus errorrrrrrrrr', err) )
});

// You can put all routes in this file; HOWEVER, this file should almost be like a table of contents for the routers you create

module.exports = apiRouter;