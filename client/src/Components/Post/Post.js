import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link , withRouter} from 'react-router-dom';
import Vote from '../Vote/Vote';
import Controls from '../Controls/Controls';
import PostInfo from './PostInfo';
import PostEdit from './PostEdit';
import { votePost, updatePost, deletePost } from '../../Actions';
import PropTypes from 'prop-types';

import './Post.css';

class Post extends Component {
	state = {
		editMode: false
	};

	handleVote(e) {
		const { post } = this.props;
		const option = e.currentTarget.value;

		this.props.dispatch(votePost(post, option));
	};

	handleDelete = e => {
		e.preventDefault();

		const { post, dispatch, history } = this.props;

		if(window.confirm(`Delete "${post.title}"?`)) {
			dispatch(deletePost(post));
			history.push('/');
		}
	};

	handleEdit = (title, body) => {
		const { post, dispatch } = this.props;

		let newPost = {
			...post,
			title,
			body
		};

		dispatch(updatePost(newPost));

		this.setState({
			editMode: false
		});
	};

	changeEdit = e => {
		this.setState({
			editMode: !this.state.editMode
		})
	};

	render() {
		const { post, showBody = false, showControls = true } = this.props;
		const { editMode } = this.state;

		return (
			<div className="post__wrapper wrapper">
				<div className="post__infos">
					{!editMode && (
						<div>
							<h2 className="post__title">
								<Link to={`/${post.category}/${post.id}`}>
									{post.title}
								</Link>
							</h2>

							<PostInfo {...{post}}/>

							{showBody && <p className="post__body">{post.body}</p>}

							{post.author === 'gfpaiva' && showControls && (
								<Controls
									handleDelete={this.handleDelete}
									changeEdit={this.changeEdit}
								/>
							)}
						</div>
					)}

					{editMode && (
						<PostEdit
							{...{post}}
							changeEdit={this.changeEdit}
							handleEdit={this.handleEdit}
						/>
					)}
				</div>

				<Vote
					handleVote={this.handleVote.bind(this)}
					voteScore={post.voteScore}
				/>
			</div>
		);
	};
};

Post.propTypes = {
	dispatch: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
	showBody: PropTypes.bool,
	showControls: PropTypes.bool
};

export default withRouter(connect(null)(Post));