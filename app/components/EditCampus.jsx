import React from 'react'
import store from '../store'
import axios from 'axios'

export default class EditCampus extends React.Component{
    constructor(){
        super()
        this.handleUpdate = this.handleUpdate.bind(this)
    }

    handleUpdate(event){
        event.preventDefault();
        const updateCampus = {
            campusName: event.target.campusName.value,
            imageUrl: event.target.imageUrl.value,
            description: event.target.description.value
        }
        axios.put('/api/updatecampus/' + this.props.match.params.campusid, updateCampus)
        .then(() => this.props.history.push('/campuses'))
        .catch(err => console.log('update student errorrrrrrrrr', err) );
    }

    render(){
        var campus = store.getState().campuses.filter( (campus) => {
            return campus.id === Number(this.props.match.params.campusid);
        } )
        return (
            <form onSubmit={this.handleUpdate}>
                <div>
                    Campus: <input name="campusName" type='text' defaultValue={campus[0].campusName} /> Image URL: <input name="imageUrl" type='text' defaultValue={campus[0].imageUrl} /> 
                </div>
                <div>
                    Description: <input name="description" type='text' defaultValue={campus[0].description} />
                </div>
                <div>
                    <button type="submit" > Update </button>
                </div>
            </form>
        )
    }
}