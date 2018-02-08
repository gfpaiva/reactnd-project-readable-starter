import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from '../Components/Post/Post';
import Comment from '../Components/Comment/Comment';
import Loader from '../Components/Loader/Loader';
import { fetchPostById, fetchCommentsByPostId, setComment } from '../Actions';
import NotFound from './NotFound';
import { values as _values } from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';

class Single extends Component {
	state = {
		commentBody: ''
	};

	commentTemplate = {
		id: null,
		parentId: null,
		timestamp: null,
		body: null,
		author: 'gfpaiva',
		voteScore: 1,
		deleted: false,
		parentDeleted: false
	}

	componentDidMount() {
		const { posts, match } = this.props;

		if(!posts || !posts[match.params.id]) this.props.dispatch(fetchPostById(match.params.id));

		this.props.dispatch(fetchCommentsByPostId(match.params.id));
	};

	bodyChange = e => {
		this.setState({
			commentBody: e.target.value
		});
	};

	saveComment = e => {
		e.preventDefault();

		let newComment = {
			...this.commentTemplate,
			id: btoa(moment().valueOf()),
			parentId: this.props.match.params.id,
			timestamp: moment().valueOf(),
			body: this.state.commentBody
		};

		this.props.dispatch(setComment(newComment));
		this.setState({
			commentBody: ''
		})
	};

	render() {
		const { posts, comments, isLoading, match } = this.props;

		const post = posts[match.params.id];

		let actualComments = (comments && comments.length > 0) ? comments.filter(comment => comment.parentId === match.params.id) : [];

		return (
			<div>
				{isLoading && <Loader />}

				{!post && !isLoading && <NotFound />}

				<div className="container">
					{post && !isLoading && (
						<div>
							<div>
								<Post
									{...{post}}
									key={post.id}
									showBody={true}
								/>

								{actualComments && actualComments.length > 0 && actualComments.map(comment => (
									<Comment
										{...{comment}}
										key={comment.id}
										postId={post.id}
									/>
								))}
							</div>

							<div className="comment__add">
								<p><strong>Add a commentary</strong></p>

								<form onSubmit={this.saveComment}>
									<textarea
										className="comment__textarea"
										placeholder="Write here..."
										rows="10" cols="80"
										maxLength="200"
										required
										onChange={this.bodyChange}
										value={this.state.commentBody}
									></textarea>

									<button className="btn comment__btn" type="submit">Save</button>
								</form>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	};
};

Single.propTypes = {
	dispatch: PropTypes.func.isRequired,
	posts: PropTypes.object.isRequired,
	comments: PropTypes.array.isRequired,
	isLoading: PropTypes.bool.isRequired
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