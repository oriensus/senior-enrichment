import React from 'react'
import axios from 'axios'
import store from '../store'

export default class CampusStudents extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            students: []
        };
        this.handleClickDelete = this.handleClickDelete.bind(this);
    }

    componentDidMount(){
        var campusid = this.props.location.pathname.substr(this.props.location.pathname.lastIndexOf('/')+1);
        axios.get('/api/campusstudents/' + campusid)
        .then(response => {
            this.setState({students: response.data});
        } )
        .catch();
    }

    handleClickDelete(campusId){
        var hasStudents = false;
        store.getState().students.forEach(student => {
            if( student.campusId === Number(campusId) )
            {
                hasStudents = true;
            }
                
        });
        if( hasStudents )
            window.alert("you cannot delete campus that have students!");
        else
        {
            axios.delete("/api/deletecampus/" + campusId)
            .then( () => this.props.history.push('/campuses') )
            .catch(err => console.log('delete campus errorrrrrrrrr', err) )
        }
    }

    render(){
        var students = this.state.students.map(function(student) {
            return <li key={student.id}>{student.firstName} {student.lastName}</li>;
        })
        var campusid = this.props.location.pathname.substr(this.props.location.pathname.lastIndexOf('/')+1);
        var campus = store.getState().campuses.filter((campus) => {
            return campus.id === Number(campusid)
        })
        return (
            <div>
                <div>
                    {campus[0].campusName} - {campus[0].description}
                </div>
                <ul>
                    {students}
                </ul>
                <button onClick={ () => this.handleClickDelete(campusid) }> Delete Campus </button>
                <button onClick={ () => this.props.history.push('/editcampus/' + campusid) }> Edit Campus </button>
            </div>
        )
    }
}

// export default class CampusStudents extends React.Component{
//     render(){
//         return (
//             <div id="myModal" className="modal">
//                 <div className="modal-content">
//                     <span className="close">&times;</span>
//                     <p>Some text in the Modal..</p>
//                 </div>
//             </div>
//         )
//     }
// }