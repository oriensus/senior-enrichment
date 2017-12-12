import React from 'react'
import axios from 'axios'

export default class AddCampus extends React.Component{
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event){
        event.preventDefault();
        var newCampus = {
            campusName: event.target.campusName.value,
            imageUrl: event.target.imageUrl.value,
            description: event.target.description.value
        }
        axios.post('/api/addcampus', newCampus)
        .then(() => this.props.history.push('/campuses'))
        .catch(err => console.log('add campus errorrrrrrrrrrr', err) )
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                Campus: <input name="campusName" />
                ImageUrl: <input name="imageUrl" />
                Description: <input name="description" />
                <button> Add </button>
            </form>
        )
    }
}