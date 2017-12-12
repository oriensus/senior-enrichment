import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Campuses from './Campuses';
import Students from './Students';
import Navbar from './Navbar'
import CampusStudents from './CampusStudents'
import AddStudent from './AddStudent'
import SingleStudent from './SingleStudent'
import AddCampus from './AddCampus'
import EditCampus from './EditCampus'

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
                    <Route path='/addcampus' component={AddCampus} />
                    <Route path='/singlestudent/:studentid' component={SingleStudent} />
                    <Route path='/editcampus/:campusid' component={EditCampus} />
                    <Redirect to='/campuses' />
                </Switch>
            </div>
        )
    }
}