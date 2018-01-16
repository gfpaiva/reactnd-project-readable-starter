import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories, fetchPosts } from '../Actions';

class App extends Component {

	componentDidMount() {
		this.props.dispatch(fetchCategories());
		this.props.dispatch(fetchPosts());
	};

	render() {
		const { categories, posts } = this.props;
		console.log(this.props);
		return (
			<div>
				{
					(categories && categories.length > 0) &&
					categories.map(category => (
						<p key={category.name}>Category: {category.name}</p>
					))
				}

				{
					(posts && posts.length > 0) &&
					posts.map(post => (
						<div key={post.id}>
							<p>{post.title}</p>
							<p>{post.body}</p>
						</div>
					))
				}
			</div>
		);
	}
}

const mapStateToProps = ({ categories, posts }) => {
	return {
		categories,
		posts
	}
};

export default connect(mapStateToProps)(App);