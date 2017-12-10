import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Campuses from './Campuses';
import Students from './Students';
import Navbar from './Navbar'
import CampusStudents from './CampusStudents'
import AddStudent from './AddStudent'
//<Route path='/students' component={Students} />
export default class MainPage extends Component {
    render(){
        return(
            <div>
                <Navbar />
                <Switch>
                    <Route path='/campuses' component={Campuses} />
                    <Route path='/students' component={Students} />
                    <Route path='/campusstudents' component={CampusStudents} />
                    <Route path='/addstudents' component={AddStudent} />
                    <Redirect to='/campuses' />
                </Switch>
            </div>
        )
    }
}