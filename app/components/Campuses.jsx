import React, { Component } from 'react'
import axios from 'axios'
import store from '../store'
import {showAllCampus} from '../reducers'
import {NavLink} from 'react-router-dom'
import CampusStudents from './CampusStudents'

export default class Campuses extends Component{
    constructor(){
        super()
        this.state = store.getState();
        this.showCampusStudents = this.showCampusStudents.bind(this);
    }

    componentDidMount(){
        axios.get('/api/campuses')
        .then(response => response.data)
        .then(data => {
            store.dispatch(showAllCampus(data));
        })
        .catch();
        this.unsubscribe = store.subscribe(() => {
            this.setState(store.getState());
        });
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    showCampusStudents(campusid){
        var modal = document.getElementById('myModal');
        modal.style.display = "block";
    }

    render(){
        var camps = store.getState().campuses.map(function(campus){
            return (
                //<a key={campus.id} onClick={ () => document.getElementById('myModal').modal.style.display = "block" }><li key={campus.id}>{campus.campusName}</li></a>
                <NavLink to={'/campusstudents/' + campus.id} key={campus.id}><li key={campus.id}>{campus.campusName}</li></NavLink>
            )
        })
        return (
            <div>
                <ul className='campus-list'>
                {camps}
                </ul>
            </div>
        )
    }
}