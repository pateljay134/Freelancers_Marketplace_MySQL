import React from 'react';
import './css/freelancer.css';
import './css/bootstrap.min.css';
import './css/main.css';
import './css/util.css';
import axios from 'axios';
// import 'https://fonts.googleapis.com/css?family=Catamaran:100,200,300,400,500,600,700,800,900';
// import 'https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i';
import './css/one-page-wonder.min.css';
//import { debug } from 'util';

class SignUp extends React.Component{
    constructor(props) {
        super(props);
        this.state = { name: null, email: null, password: null };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }
      
    handleName(e){
        this.setState({
            name : e.target.value
        })
    }
    handleEmail(e){
        this.setState({
            email : e.target.value
        })
    }
    handlePassword(e){
        this.setState({
            password : e.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault();
        //debugger
        var data_inserted;
        var val = {name: this.state.name, email: this.state.email, password: this.state.password}
        axios.post('http://localhost:3001/signupprocess', val)
        .then(res => {
            debugger
            data_inserted = res.data.data_inserted;
                //<Redirect to='http://localhost:3000/' />
            if(data_inserted){
                this.props.history.push('/');
            }
        });
    }
	render(){
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

// function mapStateToProps(state){
//     return {
//         user : state.logged_in
//     }
// }

// function mapDispatchToProps(dispatch){
//     return{
//         registerUser : (details) => {
//             // axios.post('http://localhost:3001/signupprocess'), details )
//             // .then((res) => {
//             //     dispatch({
//             //         type : 'logged_in', payload : res
//             //     });
//             //     sessionStorage.setItem("loggedin", true);
//             //     sessionStorage.setItem("email", res.data.email)
//             //     window.location.href = "http://localhost:3000/"

//             // })
//         }
//     }
// }


export default SignUp;
