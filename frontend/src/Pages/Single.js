import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from '../Components/Post/Post';
import Comment from '../Components/Comment/Comment';
import Loader from '../Components/Loader/Loader';
import { fetchPostById, fetchCommentsByPostId } from '../Actions';
import NotFound from './NotFound';
import { values as _values } from 'lodash';

class Single extends Component {
	componentDidMount() {
		const { posts, match } = this.props;

		if(!posts || !posts[match.params.id]) this.props.dispatch(fetchPostById(match.params.id));

		this.props.dispatch(fetchCommentsByPostId(match.params.id));
	};

	render() {
		const { posts, comments, isLoading, match } = this.props;

		const post = posts[match.params.id];

		return (
			<div>
				{isLoading && <Loader />}

				{!post && !isLoading && <NotFound />}

				<div className="container">
					{post && !isLoading && (
						<div>
							<Post {...{post}} key={post.id} />
							<p>{post.body}</p>
						</div>
					)}

					{comments && comments.length > 0 && !isLoading && comments.map(comment => (
						<Comment {...{comment}} key={comment.id} />
					))}
				</div>
			</div>
		);
	};
};

const mapStateToProps = ({ posts, comments, isLoading }) => {
	const commentssArray = _values(comments).sort((a, b) => {
		return parseFloat(b.voteScore) - parseFloat(a.voteScore);
	}).filter(comments => !comments.deleted);

	return {
		posts,
		isLoading,
		comments: commentssArray,
	};
};

export default connect(mapStateToProps)(Single);