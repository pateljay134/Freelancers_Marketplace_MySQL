import React from 'react';
import './css/freelancer.css';
import './css/bootstrap.min.css';
import './css/main.css';
import './css/util.css';
import axios from 'axios';
// var PasswordStrengthMeter = require('react-password-strength-meter');
// import 'https://fonts.googleapis.com/css?family=Catamaran:100,200,300,400,500,600,700,800,900';
// import 'https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i';
import './css/one-page-wonder.min.css';
//import { debug } from 'util';

class SignUp extends React.Component{
    constructor(props) {
        super(props);
        this.state = { name: null, username: null, password: null };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }
      
    handleName(e){
        this.setState({
            name : e.target.value
        })
        document.getElementById('name').innerHTML = ""
    }
    handleUsername(e){
        this.setState({
            username : e.target.value
        })
        document.getElementById('username').innerHTML = "" 
    }
    handlePassword(e){
        this.setState({
            password : e.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault();
        debugger
        var password = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
        var email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var error = false
        if(this.state.name===null){
            error=true
            document.getElementById('name').innerHTML = "Enter your name"
            
        }else{ document.getElementById('name').innerHTML = "" 
        error = false}

        if(!email.test(this.state.username) || (this.state.username===null)){
            error=true
            document.getElementById('username').innerHTML = "Not valid email address"
            
        }else{ document.getElementById('username').innerHTML = "" 
        error = false}

        if(!password.test(this.state.password)){
            error=true
            document.getElementById('password').innerHTML = "Make your password strong"
                    
        }else{ document.getElementById('password').innerHTML = "" 
        error = false}
            debugger

        if(!error){
            debugger
            var username = {username : this.state.username}
            var self = this
        axios.post('http://localhost:3001/checkemail', username)
        .then(res => {
            debugger
            var user_exist = res.data.user_exist;
                //<Redirect to='http://localhost:3000/' />
            if(user_exist){
                document.getElementById('username').innerHTML = "This username exists already"
                // window.location.href = "http://localhost:3000/Da"
               
            }
            else{
                var val = {name: self.state.name, username: self.state.username, password: self.state.password}
               
                axios.post('http://localhost:3001/signupprocess', val)
                .then(res => {
                debugger
                var logged_in = res.data.logged_in;
                    //<Redirect to='http://localhost:3000/' />
                if(logged_in){
                    window.sessionStorage.setItem("logged_in",logged_in)
                    window.sessionStorage.setItem("username", this.state.username);
                    window.sessionStorage.setItem("password", this.state.password);
                    window.location.href = "http://localhost:3000/Dashboard"
                    // this.props.history.push('/Dashboard');
                }
                });
            }
        });
    } 
    }
	render(){
        if(window.sessionStorage.getItem("logged_in") || window.sessionStorage.logged_in===undefined){
		return(
            <div className="limiter">
		        <div className="container-login100">
			        <div className="wrap-login100 p-t-50 p-b-90">
				        <form method = "POST" className="login100-form validate-form flex-sb flex-w">
					        <span className="login100-form-title p-b-51"> SignUp </span>
                            <div className="wrap-input100 validate-input m-b-16" data-validate = "Name is required">
						        <input className="input100" type="text" name="Name"   onChange = {this.handleName.bind(this)} placeholder="Enter Your Name" required="true"/>
						        <span className="focus-input100"></span>
					        </div>
                            <p id="name" style={{color:'blue', marginBottom:5}}></p>
                            <div className="wrap-input100 validate-input m-b-16" data-validate = "Email address is required">
						        <input className="input100" type="email" name="username" onChange = {this.handleUsername.bind(this)} placeholder="Enter your Email ID" required="true"/>
						        <span className="focus-input100"></span>
					        </div>
                            <p id="username" style={{color:'blue', marginBottom:5}}></p>
                            <div className="wrap-input100 validate-input m-b-16" data-validate = "Password is required">
                                <input className="input100" type="password" name="pass" onChange = {this.handlePassword.bind(this)} placeholder="Password" required="true"/>
                                <span className="focus-input100"></span>
                            </div>
                            {/* <PasswordStrengthMeter passwordText={"Enter Password"} onChange={this.onChange} />; */}
                            <p id="password" style={{color:'blue', marginBottom:5}}></p>
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
    }else{
        return(
            window.location.href = "http://localhost:3000"
        )
    }
    }
}

// function mapStateToProps(state){
//     return {
//         user : state.username
//     }
// }

// function mapDispatchToProps(dispatch){
//     return{
//         registerUser : (details) => {
//             axios.post('http://localhost:3001/signupprocess'), details)
//             .then((res) => {
//                 dispatch({
//                     type : 'logged_in', payload : res
//                 });
//                 sessionStorage.setItem("loggedin", true);
//                 sessionStorage.setItem("email", res.data.email)
//                 window.location.href = "http://localhost:3000/"
//             })
//         }
//     }
// }


export default SignUp;
