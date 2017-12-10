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
        axios.get('/campuses')
        .then(response => store.dispatch( showAllCampus(response.data)) )
        .catch(error => console.log('errorrrrrrrrr', error))
        this.unsubscribe = store.subscribe( () => {
            this.setState(store.getState());
        });
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    handleSubmit(event){
        event.preventDefault();
        //console.log('eventttttttttttttttttt', this.props.history);
        const newStudent = {
            studentName: event.target.newStudentName.value,
            campusId: event.target.campusid.value
        }
        axios.post('/api/addstudent/', newStudent)
        //.then( response => console.log('cccccccccccccc', response) )
        .then(() => this.props.history.push('/students'))
        .catch();
    }

    render(){
        var campuses = store.getState().campuses.map( (campus) => {
            return (
                <option key={campus.id}>{campus.name}</option>
            )
        });

        return(
            <form onSubmit={this.handleSubmit}>
                <label>Add a New Student: </label>
                <input type="text" name="newStudentName"/>
                <select>{campuses}</select>
                <button type="submit"> Add </button>
            </form>
        )
    }
}