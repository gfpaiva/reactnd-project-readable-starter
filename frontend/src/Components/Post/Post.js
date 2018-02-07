import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Vote from '../Vote/Vote';
import Actions from '../Actions/Actions';
import { formatDate } from '../../Utils/helpers';
import { FaUser, FaCalendar, FaCommentsO } from 'react-icons/lib/fa';
import { votePost, deletePost } from '../../Actions';

import './Post.css';

class Post extends Component {

	handleVote(e) {
		const { post } = this.props;
		const option = e.currentTarget.value;

		this.props.dispatch(votePost(post, option));
	};

	handleDelete = e => {
		e.preventDefault();

		const { post, dispatch } = this.props;

		if(window.confirm(`Delete ${post.title}?`)) {
			dispatch(deletePost(post))
		}
	};


	render() {
		const { post, showBody } = this.props;

		return (
			<div className="post__wrapper wrapper">
				<div className="post__infos">
					<h2 className="post__title">
						<Link to={`/${post.category}/${post.id}`}>
							{post.title}
						</Link>
					</h2>
					<p className="info"><FaUser /> {post.author}</p>
					<p className="info"><FaCalendar /> {formatDate(post.timestamp)}</p>
					<p className="info"><FaCommentsO /> {post.commentCount}</p>

					{showBody && <p className="post__body">{post.body}</p>}
				</div>
				<Vote handleVote={this.handleVote.bind(this)} voteScore={post.voteScore} />
				{post.author === 'gfpaiva' && <Actions handleDelete={this.handleDelete} />}
			</div>
		);
	};
};

export default connect(null)(Post);