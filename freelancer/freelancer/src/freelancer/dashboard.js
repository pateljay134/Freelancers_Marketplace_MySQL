import React from 'react';
import './css/freelancer.css';
import './css/bootstrap.min.css';
import './css/main.css';
import './css/util.css';
import DisplayProjects from './displayprojects';
import axios from 'axios';
import './css/one-page-wonder.min.css';

class DashBoard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {projects : [],average_days:[]}
    }

    componentDidMount() {
        debugger
        axios.post('http://localhost:3001/projectsfetch')
        .then(res => {
            debugger
            this.setState({
                projects : res.data.rows,
                average_days : res.data.result
            })
        });
        debugger
    }

	render(){

        var project_list = this.state.projects.map( data => { 
                return(
                <DisplayProjects project_id = {data.project_id}  title = {data.title} description = {data.description} skills_required = {data.skills_required} employer = {data.employer} budget_range = {data.budget_range} total_bids = {data.total_bids} status = {data.status}/>

                )
        })


        if(window.sessionStorage.logged_in === "true"){
            
            return(
                <div className="table">
                
                    <table className="table">
                        <thead>
                            <tr >
                            <th>Project Id</th>
                            <th>Project Name</th>
                            <th>Description</th>
                            <th>Skills Required</th>
                            <th>Employer</th>
                            <th>Budget Range</th>
                            <th>Project Status</th>
                            <th>Average Days</th>
                            </tr>
                        </thead>
                        <tbody>
                            {project_list}
                        </tbody>
                    </table>
                </div>
            )
        }
        else{
            return(
                window.location.href = "http://localhost:3000/SignIn"
            )
        }
    }
}

export default DashBoard;
