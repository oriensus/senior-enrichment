import React from 'react'
import store from '../store'
import axios from 'axios'

export default class SingleStudent extends React.Component{
    constructor(){
        super()
        this.handleUpdate = this.handleUpdate.bind(this)
    }

    handleUpdate(event){
        event.preventDefault();
        const updateStudent = {
            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            email: event.target.email.value,
            gpa: event.target.gpa.value,
            campusId: event.target.campus.value
        }
        axios.put('/api/updatestudent/' + this.props.match.params.studentid, updateStudent)
        .then(() => this.props.history.push('/students'))
        .catch(err => console.log('update student errorrrrrrrrr', err) );
    }

    render(){
        var student = store.getState().students.filter( student => {
            return student.id === Number(this.props.match.params.studentid)
        } )
        var campus = store.getState().campuses.filter( (campus) => {
            return campus.id === student[0].campusId;
        } )
        var campusList = store.getState().campuses.map( (campus) => {
            if( campus.id === student[0].campusId )
            {
                return (
                    <option value={campus.id} key={campus.id} selected>{campus.campusName}</option>
                )
            }
            else
            {
                return (
                    <option value={campus.id} key={campus.id}>{campus.campusName}</option>
                )
            }
        })
        return(
            <form onSubmit={this.handleUpdate}>
                <div>
                    First Name: <input name="firstName" type='text' defaultValue={student[0].firstName} /> Last Name: <input name="lastName" type='text' defaultValue={student[0].lastName} /> 
                </div>
                <div>
                    Email: <input name="email" type='text' defaultValue={student[0].email} /> GPA: <input name="gpa" type='text' defaultValue={student[0].gpa} /> 
                    <select name="campus">
                        {campusList}
                    </select>
                </div>
                <div>
                    <button type="submit" > Update </button>
                </div>
            </form>
        )
    }
}