import React from 'react'
import axios from 'axios'
import store from '../store'
import {showAllCampus} from '../reducers'

export default class AddStudent extends React.Component{
    constructor(props){
        super(props)
        this.state = store.getState();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        axios.get('/api/campuses')
        .then(response => {
            store.dispatch( showAllCampus(response.data))
        } )
        .catch(error => console.log('add students errorrrrrrrrr', error))
        this.unsubscribe = store.subscribe( () => {
            this.setState(store.getState());
        });
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    handleSubmit(event){
        event.preventDefault();
        console.log('sssssssss', event)
        const newStudent = {
            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            email: event.target.email.value,
            gpa: event.target.gpa.value,
            campusId: event.target.campus.value
        }
        axios.post('/api/addstudent/', newStudent)
        .then(() => this.props.history.push('/students'))
        .catch();
    }

    render(){
        var campuses = store.getState().campuses.map( (campus) => {
            return (
                <option value={campus.id} key={campus.id}>{campus.campusName}</option>
            )
        });

        return(
            <form onSubmit={this.handleSubmit}>
                <label>Add a New Student: </label>
                First Name: <input type="text" name="firstName"/>
                Last Name: <input type="text" name="lastName"/>
                Email: <input type="text" name="email"/>
                GPA: <input type="text" name='gpa'/>
                <select name="campus">{campuses}</select>
                <button type="submit"> Add </button>
            </form>
        )
    }
}