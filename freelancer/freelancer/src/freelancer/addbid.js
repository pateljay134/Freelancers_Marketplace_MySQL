

import React from 'react';
import './css/freelancer.css';
import './css/bootstrap.min.css';
import './css/main.css';
import './css/util.css';
// import DisplayProjects from './displayprojects';
import axios from 'axios';
// import HomePage from './homepage';
// import 'https://fonts.googleapis.com/css?family=Catamaran:100,200,300,400,500,600,700,800,900';
// import 'https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i';
import './css/one-page-wonder.min.css';
//import { debug } from 'util';


class AddBid extends React.Component{
    constructor(props) {
        super(props);
        this.state = {}
        // this.handleLoad = this.handleLoad.bind(this);
    }

	render(){
        debugger
        
        return(
            <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100 p-t-50 p-b-90">
                    <form method = "POST" className="login100-form validate-form flex-sb flex-w">
                        <span className="login100-form-title p-b-51"> SignUp </span>
                        <div className="wrap-input100 validate-input m-b-16" data-validate = "Name is required">
                            <input className="input100" type="text" name="Name" required onChange = {this.handleName.bind(this)} placeholder="Enter Your Name" />
                            <span className="focus-input100"></span>
                        </div>
                        <div className="wrap-input100 validate-input m-b-16" data-validate = "Email address is required">
                            <input className="input100" type="email" name="username" required onChange = {this.handleEmail.bind(this)} placeholder="Enter your Email ID" />
                            <span className="focus-input100"></span>
                        </div>
                        <div className="wrap-input100 validate-input m-b-16" data-validate = "Password is required">
                            <input className="input100" type="password" name="pass" required onChange = {this.handlePassword.bind(this)} placeholder="Password" />
                            <span className="focus-input100"></span>
                        </div>
                        {/* <div className="flex-sb-m w-full p-t-3 p-b-24">
                            <div>
                                <a href="#" className="txt1">
                                    Forgot?
                                </a>
                            </div>
                        </div> */}

                        <div className="container-login100-form-btn m-t-17">
                            <input type="submit" className="login100-form-btn" value="SignUp" onClick = {this.handleSubmit}/>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}
}

export default AddBid;
