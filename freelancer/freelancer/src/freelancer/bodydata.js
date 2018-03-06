import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import SignIn from './signin';
import SignUp from './signup';
import HomePage from './homepage';
import AddProject from './addproject';
import Profile from './profile';
import DisplayProjects from './displayprojects';

class BodyData extends React.Component{
	render(){
		return(
			<Router>
				<div>
					<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/SignUp" component={SignUp} />
					<Route path="/SignIn" component={SignIn} />
					<Route path="/AddProject" component={AddProject} />
					<Route path="/Profile" component={Profile} />
					{/* <Route path="/DisplayProjects" component={DisplayProjects} /> */}
					</Switch>
				</div>
			</Router>
		)
	}
}

  export default BodyData; 