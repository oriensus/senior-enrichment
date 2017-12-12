import React, { Component } from 'react'
import store from '../store'
import axios from 'axios'
import {showAllStudents} from '../reducers'
import {NavLink} from 'react-router-dom'

export default class Students extends Component {
    constructor(){
        super();
        this.state = store.getState();
        this.handleDeleteStudent = this.handleDeleteStudent.bind(this);
    }

    componentDidMount(){
        axios.get('/api/students')
        .then(response => response.data)
        .then(data => {
            store.dispatch(showAllStudents(data))
        })
        .catch();
        this.unsubscribe = store.subscribe(() => {
            this.setState(store.getState());
        });
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    handleDeleteStudent(studentId){
        axios.delete('/api/deletestudent/' + studentId)
        .then( () => {return axios.get('/api/students')} )
        .then( response => store.dispatch( showAllStudents(response.data) ) )
        .then(() => this.props.history.push('/students') )
        .catch();
    }

    render(){
        
        var students = store.getState().students.map(student => {
            return(
                <NavLink key={student.id} to={'/singlestudent/' + student.id}>
                <li key={student.id}>
                    <span>{student.id} , {student.firstName} {student.lastName}, {student.campus.campusName}</span>
                    <span className="badge"><button onClick={ () => this.handleDeleteStudent(student.id) }>X</button></span>
                </li>
                </NavLink>
            )
            });

        return (
            <div>
                <ul>
                    {students}
                </ul>
                <div>
                    <button onClick={ () => { 
                            //window.location.assign('/addstudents') 
                            this.props.history.push('/addstudents')
                        } } >Add Student</button>
                </div>
            </div>
        )
    }
}