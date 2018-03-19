import React from 'react';
import './css/freelancer.css';
import './css/bootstrap.min.css';
import './css/main.css';
import './css/util.css';
import axios from 'axios';
import './css/one-page-wonder.min.css';


class DisplayProjects extends React.Component{
    constructor(props) {
        super(props);
        this.state = {average_days:null}
        this.handleClick = this.handleClick.bind(this);
        this.handleLinkClick = this.handleLinkClick.bind(this);
        this.handleAdminLinkClick = this.handleAdminLinkClick.bind(this);
    }
    componentDidMount() {
        if(this.props.project_id !== null){
        var project_details = { project_id : this.props.project_id}
        debugger
        axios.post('http://localhost:3001/projectfetch', project_details)
        .then(res => {
            debugger
            this.setState({
                average_days : res.data.average_days.avg
            })
        });
        }
        // else{
        //     var project_details = { project_id : this.props.project_id}
        //     debugger
        //     axios.post('http://localhost:3001/projectfetch', project_details)
        //     .then(res => {
        //         debugger
        //         this.setState({
        //             average_days : res.data.average_days.avg
        //         })
        //     });
        //     }
        // }
    }

    handleClick(e){
        // this.setState({
        //     bid_on_project : true
        // })
        window.sessionStorage.setItem("project_id",this.props.project_id );
        window.location.href = "http://localhost:3000/addbid"
    }

    handleLinkClick(e){
        debugger
            window.sessionStorage.setItem("project_id",this.props.project_id );
            window.location.href = "http://localhost:3000/addbid"
        // });
    }
    handleAdminLinkClick(e){
        window.sessionStorage.setItem("project_id",this.props.project_id );
        window.sessionStorage.setItem("isAdmin",true);
        window.location.href = "http://localhost:3000/addbid"
        // });
    }

	render(){
        debugger
        const rand = (10 + Math.random() * (55 - 10)).toFixed(3);
        if(window.location.href === "http://localhost:3000/adminaction"){
            return (
            // this.state.bid_on_project ? passwordPage : displayprojects 
            <tr >
            <td >{this.props.project_id}</td>
            {/* <td>{this.props.average_days}</td> */}
            <td ><a href="#" style={{color:'blue'}} onClick = {this.handleAdminLinkClick}>{this.props.title}</a></td>
            <td >{this.props.description}</td>
            <td >{this.props.skills_required}</td>
            <td >$0 - {this.props.budget_range}</td>
            {/* <td >{this.props.total_bids}</td>  */}
            <td>{this.props.hired_bidder}</td>
            <td>{this.props.status}</td> 
            <td>{this.state.average_days}</td>
            {/* <td>{this.props.project_id === this.props.days_id ? this.props.avgdays : ''}</td> */}
            {/* <button className="login100-form-btn-bid" value  = {this.props.project_id} onClick = {this.handleClick}>Bid on Project</button> */}
            </tr> 
        )
        }else{
            return (
                // this.state.bid_on_project ? passwordPage : displayprojects 
                <tr >
                <td >{this.props.project_id}</td>
                {/* <td>{this.props.average_days}</td> */}
                <td ><a href="#" style={{color:'blue'}} onClick = {this.handleLinkClick}>{this.props.title}</a></td>
                <td >{this.props.description}</td>
                <td >{this.props.skills_required}</td>
                <td >{this.props.employer}</td>
                <td >$0 - {this.props.budget_range}</td> 
                {/* <td>{this.props.average_days}</td>
                <td >{this.props.total_bids}</td> */}
                <td>{this.props.status}</td> 
                {/* <td>{rand}</td> */}
                <td>{this.state.average_days}</td>
                {/* <td>{this.props.project_id === this.props.days_id ? this.props.avgdays : ''}</td> */}
                <button className="login100-form-btn-bid" value  = {this.props.project_id} onClick = {this.handleClick}>Bid on Project</button>
                </tr> 
            )
        }
    }
}

export default DisplayProjects;
