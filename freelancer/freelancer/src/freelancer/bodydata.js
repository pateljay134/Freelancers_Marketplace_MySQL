import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import SignIn from './signin';
import SignUp from './signup';
import HomePage from './homepage';
import AddProject from './addproject';
import Profile from './profile';
import Dashboard from './dashboard';
// import {Provider} from 'react-redux';
//import allReducers from './reducers'
// import { createStore } from '../../../../../Library/Caches/typescript/2.7/node_modules/redux';

// function loadState(){
// 	try{
// 		let current_state = sessionStorage.getItem("logged_in");
// 		if(current_state === null) { return this.initializeState();}
// 		return;
// 	}
// 	catch(err){
// 		return initializeState();
// 	}
// }

// function initializeState(){
// 	let initial_state = false;
// 	localStorage.setItem("logged_in", initial_state);
// }
// const store = createStore( loadState);


class BodyData extends React.Component{
	// handleLoad(e){
    //     e.preventDefault();
	// 	window.sessionStorage.setItem("logged_in", false)
    // }
    // componentDidMount() {
    //     window.addEventListener('load', this.handleLoad);
    //  }



	render(){
		return(
			// <Provider store = {store}>
			// {/* <Layout> */}
			<Router>
				<div>
					<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/SignUp" component={SignUp} />
					<Route path="/SignIn" component={SignIn} />
					{/* <Route path="/SignIn" component={SignIn} store = {store} /> */}
					<Route path="/AddProject" component={AddProject} />
					<Route path="/Profile" component={Profile} />
					{/* <Route path="/Profile" component={Profile} store = {store}/>  */}
					<Route path="/Dashboard" component={Dashboard} /> 
					</Switch>
				</div>
			</Router>
			// {/* </Layout> */}
			// </Provider>
		)
	}
}

  export default BodyData; 