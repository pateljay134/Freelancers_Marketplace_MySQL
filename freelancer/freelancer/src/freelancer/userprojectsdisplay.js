import React from 'react';
import './css/freelancer.css';
import './css/bootstrap.min.css';
import './css/main.css';
import './css/util.css';
// import DisplayProjects from './displayprojects';
// import axios from 'axios';
// import HomePage from './homepage';
// import 'https://fonts.googleapis.com/css?family=Catamaran:100,200,300,400,500,600,700,800,900';
// import 'https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i';
import './css/one-page-wonder.min.css';
// import AddBid from './addbid';
// import { debug } from 'util';


class UserProjectsDisplay extends React.Component{
    constructor(props) {
        super(props);
        // this.state = {bid_on_project : false}
        this.state = {}
        this.handleClick = this.handleClick.bind(this);
        // this.handleCancel = this.handleCancel.bind(this);
    }

    handleClick(e){
        window.sessionStorage.setItem("project_id",this.props.project_id );
        window.location.href = "http://localhost:3000/adminaction"
    }


	render(){
        
        return (
            // this.state.bid_on_project ? passwordPage : displayprojects 
           <tr >
            <td >{this.props.project_id}</td>
            <td >{this.props.title}</td>
            <td >{this.props.description}</td>
            <td >{this.props.skills_required}</td>
            {/* <td >{this.props.employer}</td> */}
            <td >$0 - {this.props.budget_range}</td> 
            <td >{this.props.total_bids}</td> 
            <button className="login100-form-btn-bid" value  = {this.props.project_id} onClick = {this.handleClick}>View Bidders</button>
              
        </tr>
        )
    }
}

export default UserProjectsDisplay;
