import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Campuses from './Campuses';
import Students from './Students';
import Navbar from './Navbar'
//<Route path='/students' component={Students} />
export default class MainPage extends Component {
    render(){
        return(
            <div>
                <Navbar />
                <Switch>
                    <Route path='/campuses' component={Campuses} />
                    <Route path='/students' component={Students} />
                    <Redirect to='/campuses' />
                </Switch>
            </div>
        )
    }
}