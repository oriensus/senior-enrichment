import React from 'react'
import axios from 'axios'
import store from '../store'
import {showCampusStudents} from '../reducers'

export default class CampusStudents extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            //students: []
            campusStudents: []
        };
        this.handleClickDelete = this.handleClickDelete.bind(this);
        this.handleSubmitAddStudent = this.handleSubmitAddStudent.bind(this);
    }

    componentDidMount(){
        var campusid = this.props.location.pathname.substr(this.props.location.pathname.lastIndexOf('/')+1);
        axios.get('/api/campusstudents/' + campusid)
        .then(response => {
            //this.setState({students: response.data});
            store.dispatch( showCampusStudents(response.data) );
        } )
        .catch();
        
        this.unsubscribe = store.subscribe(() => {
            this.setState(store.getState());
        })
    }

    componentWillUnmount(){
        this.unsubscribe();
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

    handleSubmitAddStudent(event){
        event.preventDefault();
        const studentid = event.target.addStudent.value;
        const campusid = this.props.location.pathname.substr(this.props.location.pathname.lastIndexOf('/')+1);
        const addStudentToCampus = {
            campusId: campusid
        }
        axios.put('/api/addstudenttocampus/' + studentid + '/' + campusid, addStudentToCampus)
        .then(() => {
            this.props.history.push('/campusstudents/' + campusid)
            this.setState(store.getState()); 
        })
        .catch(err => console.log('update student errorrrrrrrrr', err) );
    }

    render(){
        var students = this.state.campusStudents.map(function(student) {
            return <li key={student.id}>{student.firstName} {student.lastName}</li>;
        })
        var allStudents = store.getState().students.map(student => {
            return (
                <option key={student.id} value={student.id}>{student.firstName} {student.lastName}</option>
            )
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
                <form onSubmit={this.handleSubmitAddStudent}>
                    <select name="addStudent">
                        {allStudents}
                    </select>
                    <button type="submit" > Add </button>
                </form>
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