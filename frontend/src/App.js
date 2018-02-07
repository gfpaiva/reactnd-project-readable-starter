import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { fetchCategories } from './Actions';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Archive from './Pages/Archive';
import Single from './Pages/Single';
import NotFound from './Pages/NotFound';
import AddPost from './Pages/AddPost';

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
					<Route exact path="/add" component={AddPost}/>
					<Route exact path="/:category" component={Archive}/>
					<Route exact path="/:category/:id" component={Single}/>
					{/* 404 page */}
					<Route component={NotFound} />
				</Switch>
				<Footer />
			</div>
		);
	}
}

export default withRouter(connect(null)(App));