import React from 'react';
import './css/bootstrap.min.css';
// import 'https://fonts.googleapis.com/css?family=Catamaran:100,200,300,400,500,600,700,800,900';
// import 'https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i';
import './css/one-page-wonder.min.css';

class Header extends React.Component{
  constructor(props){
    super(props)
		this.state = {
      Profile : './Profile',
      SignOut : './SignOut',
      AddProject : './AddProject',
      SignIn : './SignIn',
      SignUp  : './SignUp',
      Dashboard  : './Dashboard'
		}
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  //window.sessionStorage.getItem("logged_in");

// componentDidMount() {
//   debugger
//       this.setState({
//         logged_in : window.sessionStorage.getItem("logged_in")
//       })
// }

handleSignOut(e){
  // debugger
  window.sessionStorage.setItem("logged_in",false)
  window.sessionStorage.setItem("username",null)
  window.sessionStorage.setItem("password",null)  
  this.setState({ logged_in : false })
  if(window.sessionStorage.logged_in === "false"){
    // this.props.history.push('/');
    window.location.href = "http://localhost:3000/";
  }
}

	render(){
    // debugger
    if(window.sessionStorage.logged_in === "true"){
      return(
        <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
          <div className="container">
            <a className="navbar-brand" href="/">FreeLancer</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" value = 'Dashboard' href = {this.state.Dashboard} >Dashboard</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" value = 'Profile' href = {this.state.Profile} >Profile</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" value = 'AddProject' href = {this.state.AddProject} >Add Project</a>
                </li>
                <li className="nav-item">
                  <button className="nav-link" value = 'SignOut' onClick = {this.handleSignOut} >Sign Out</button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )
    }
    else{
      return(
        <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
          <div className="container">
            <a className="navbar-brand" href="/">FreeLancer</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
              
                <li className="nav-item">
                  <a className="nav-link" value = 'SignUp' href = {this.state.SignUp} >Sign Up</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" value = 'SignIn' href = {this.state.SignIn} >Log In</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )
    }
  }
}



export default Header; 
