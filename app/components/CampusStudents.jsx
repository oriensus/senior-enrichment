import React from 'react'
import axios from 'axios'

export default class CampusStudents extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            students: []
        };
    }

    componentDidMount(){
        var campusid = this.props.location.pathname.substr(this.props.location.pathname.lastIndexOf('/')+1);
        axios.get('/api/campusstudents/' + campusid)
        .then(response => {
            this.setState({students: response.data});
        } )
        .catch();
    }

    render(){
        var students = this.state.students.map(function(student) {
            return <li key={student.id}>{student.studentName}</li>;
        })
        return (
            <div>
                <ul>
                    {students}
                </ul>
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