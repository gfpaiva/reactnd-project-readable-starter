import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { fetchCategories } from './Actions';
import Header from './Components/Header/Header';
import Home from './Pages/Home';

class App extends Component {

	componentDidMount() {
		this.props.dispatch(fetchCategories());
	};

	render() {
		return (
			<div className="app">
				<Header />
				<Switch>
					<Route exact path="/" component={Home}/>

					{/* 404 page */}
					<Route render={() => (<h1 style={{textAlign: 'center'}}>Page not foud <span role="img" aria-label="Sad Face">😡</span></h1>)} />
				</Switch>
			</div>
		);
	}
}

export default connect(null)(App);