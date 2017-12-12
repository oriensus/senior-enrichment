import React from 'react'
import { NavLink } from 'react-router-dom'

export default class Navbar extends React.Component {
    render(){
        return(
            <nav>
                <NavLink to=''><h3>Home </h3></NavLink>
                <NavLink to='/students'><h3> Students</h3></NavLink>
                <hr/>
            </nav>
        )
    }
}