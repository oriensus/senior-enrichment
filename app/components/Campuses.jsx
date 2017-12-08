import React, { Component } from 'react'
import axios from 'axios'
import store from '../store'
import {showAllCampus} from '../reducers'

export default class Campuses extends Component{
    constructor(){
        super()
        this.state = store.getState();

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

    render(){
        var camps = store.getState().campuses.map(function(campus){
            return (<li>{campus.campusName}</li>)
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