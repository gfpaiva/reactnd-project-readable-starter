import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from '../Components/Post/Post';
import { fetchPostById } from '../Actions';


class Single extends Component {

	componentDidMount() {
		const { posts, match } = this.props;

		if(!posts || !posts[match.params.id]) this.props.dispatch(fetchPostById(match.params.id));
	};

	render() {
		const { posts, match } = this.props;
		const post = posts[match.params.id];

		return (
			<div className="container">
				{post && <Post {...{post}} key={post.id} />}
			</div>
		);
	};
};

const mapStateToProps = ({ posts }) => ({ posts });

export default connect(mapStateToProps)(Single);