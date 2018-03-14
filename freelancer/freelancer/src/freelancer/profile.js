import React from 'react';
import './css/freelancer.css';
import './css/bootstrap.min.css';
import './css/main.css';
import './css/util.css';
import axios from 'axios';
// import UserDetails from './userdetails';
// import 'https://fonts.googleapis.com/css?family=Catamaran:100,200,300,400,500,600,700,800,900';
// import 'https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i';
import './css/one-page-wonder.min.css';
import Homepage from './homepage';
//import { debug } from 'util';

class Profile extends React.Component{
    constructor(props) {
        super(props);
        this.state = { name: null, username: null, phone_number: null, skills: null , about_me : null, password : null, file: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePhoneNumber = this.handlePhoneNumber.bind(this);
        this.handleAboutMe = this.handleAboutMe.bind(this);
        this.handleSkills = this.handleSkills.bind(this);
        this.handleImage = this.handleImage.bind(this);
    }
      
    handleName(e){
        this.setState({
            name : e.target.value
        })
    }
    handleEmail(e){
        this.setState({
            username : e.target.value
        })
    }
    handlePhoneNumber(e){
        this.setState({
            phone_number : e.target.value
        })
    }
    handleAboutMe(e){
        this.setState({
            about_me : e.target.value
        })
    }
    handleSkills(e){
        this.setState({
            skills : e.target.value
        })
    }
    handleImage(e){
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
            });
        }
        reader.readAsDataURL(file)
    }

    handleSubmit(e){
        e.preventDefault();
        var data_inserted;
        const formData = new FormData();
        formData.append('file', this.state.file);
        formData.append('id', 1);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        debugger
        var val = {profile_image:this.state.file,name: this.state.name, username: this.state.username, password: this.state.password, phone_number: this.state.phone_number, skills: this.state.skills, about_me: this.state.about_me}
        axios.post('http://localhost:3001/profileupdate', val, formData, config)
        .then(res => {
            debugger
            data_inserted = res.data.data_inserted;
            if(data_inserted){
                alert('upload success');
                this.props.history.push('/');
            }
        });
            // let uploadAPI = 'http://localhost:3001/uploadImage';
            // const formData = new FormData();
            // formData.append('file', this.state.file);
            // formData.append('id', 1);
            // const config = {
            // headers: {
            // 'content-type': 'multipart/form-data'
            // }
            // }
            // post(uploadAPI, formData, config).then(function (res) {
           
            //     alert('upload success');
           
            // });

    }
    componentWillMount() {
        var profile = {username : window.sessionStorage.getItem("username")}
        debugger
        axios.post('http://localhost:3001/profilefetch', profile)
        .then(res => {
            debugger
            this.setState({
                name : res.data.name, 
                username: res.data.username, 
                phone_number: res.data.phone_number, 
                skills: res.data.skills, 
                about_me : res.data.about_me,
                password : res.data.password,
                file : res.data.profile_image
            })
        });
    }
	render(){
        debugger
        if(window.sessionStorage.username !== "null"){
		return(
            <div className="limiter">
		        <div className="container-login100">
			        <div className="wrap-login100 p-t-50 p-b-90">
				        <form method = "POST" className="login100-form validate-form flex-sb flex-w">
					        <span className="login100-form-title p-b-51"> Profile </span>
                                <div className="input100" data-validate = "Name is required">
                                    <input type="file" onChange={this.handleImage} className="input100"/><br />
                                </div>
                                {/* <button type="submit" value="Upload Image" onClick={this.handleSubmit}></button> */}
                            Name : <div className="wrap-input100 validate-input m-b-16" data-validate = "Name is required">
						        <input className="input100" type="text" name="Name" onChange = {this.handleName.bind(this)} placeholder={this.state.name} />
						        <span className="focus-input100"></span>
					        </div>
                            Email : <div className="wrap-input100 validate-input m-b-16" data-validate = "Email address is required">
						        <input className="input100" type="email" name="username" onChange = {this.handleEmail.bind(this)} placeholder={this.state.username} />
						        <span className="focus-input100"></span>
					        </div>
                            Phone Number : <div className="wrap-input100 validate-input m-b-16" data-validate = "Phone Number is required">
                                <input className="input100" type="number" min = '1111111111' max = '9999999999' name="phone_number" onChange = {this.handlePhoneNumber.bind(this)} placeholder={this.state.phone_number!==null ? this.state.phone_number : "Enter Your Phone Number"} />
                                <span className="focus-input100"></span>
                            </div>
                            What You Are : <div className="wrap-input100 validate-input m-b-16" data-validate = "About Me">
						        <input className="input100" type="text" name="about_me" required onChange = {this.handleAboutMe.bind(this)} placeholder={this.state.about_me!==null ? this.state.about_me : "Enter Something About You"} />
						        <span className="focus-input100"></span>
					        </div>
                            Your Skills : <div className="wrap-input100 validate-input m-b-16" data-validate = "Skills">
                                <input className="input100" type="text" name="skills" required onChange = {this.handleSkills.bind(this)} placeholder={this.state.skills!==null ? this.state.skills : "Enter Your Skills"} />
                                <span className="focus-input100"></span>
                            </div>

                            {/* <div className="flex-sb-m w-full p-t-3 p-b-24">
                                <div>
                                    <a href="#" onClick = {this.handleClick} className="txt1">
                                        Update Profile ?
                                    </a>
                                </div>
					        </div> */}

                            <div className="container-login100-form-btn m-t-17">
                                <input type="submit" className="login100-form-btn" value="Update Profile" onClick = {this.handleSubmit}/>
                            </div>

				        </form>
			        </div>
		        </div>
	        </div>
        )
    } else{
        return(<div>
            {/* <Header/> */}
            <Homepage/>
        </div>
        )
        }
    }
}

export default Profile;
