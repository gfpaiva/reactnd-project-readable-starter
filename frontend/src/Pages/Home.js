import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from '../Components/Post/Post';
import { fetchPosts } from '../Actions';

class Home extends Component {

	componentDidMount() {
		this.props.dispatch(fetchPosts());
	};

	render() {
		const { posts } = this.props;

		return (
			<div className="container">
				{(posts && posts.length > 0) &&
				posts.map(post => (
					<Post {...{post}} key={post.id} />
				))}
			</div>
		);
	};
};

const mapStateToProps = ({ posts }) => {
	return {
		posts
	}
};

export default connect(mapStateToProps)(Home);