import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { fetchCategories } from './Actions';
import Header from './Components/Header/Header';
import Archive from './Pages/Archive';
import Single from './Pages/Single';
import NotFound from './Pages/NotFound';

class App extends Component {

	componentDidMount() {
		this.props.dispatch(fetchCategories());
	};

	render() {
		return (
			<div className="app">
				<Header />
				<Switch>
					<Route exact path="/" component={Archive}/>
					<Route exact path="/:category" component={Archive}/>
					<Route exact path="/:category/:id" component={Single}/>
					{/* 404 page */}
					<Route component={NotFound} />
				</Switch>
			</div>
		);
	}
}

export default withRouter(connect(null)(App));