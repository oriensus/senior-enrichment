import React, { Component } from 'react'
import store from '../store'
import axios from 'axios'
import {showAllStudents} from '../reducers'

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
        axios('/api/deletestudent/' + studentId)
        .then( () => {return axios.get('/api/students')} )
        .then( response => store.dispatch( showAllStudents(response.data) ) )
        .catch();
    }

    render(){
        
        var students = store.getState().students.map(student => {
            return(
                <li key={student.id}>
                    <span>{student.id} , {student.studentName} , {student.campus.campusName}</span>
                    <span className="badge"><button onClick={ () => this.handleDeleteStudent(student.id) }>X</button></span>
                </li>
            )
            });

        return (
            <ul>
                {students}
            </ul>
        )
    }
}