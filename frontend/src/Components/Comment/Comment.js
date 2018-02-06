import React, { Component } from 'react';
import { connect } from 'react-redux';
import Vote from '../Vote/Vote';
import { formatDate } from '../../Utils/helpers';
import { FaUser, FaCalendar } from 'react-icons/lib/fa';
import { voteComment } from '../../Actions';

import './Comment.css';

class Comment extends Component {

	handleVote(e) {
		const { comment } = this.props;
		const option = e.currentTarget.value;

		this.props.dispatch(voteComment(comment, option));
	};


	render() {
		const { comment } = this.props;

		return (
			<div className="comment__wrapper wrapper">
				<div className="comment__infos">
					<p className="comment__body">{comment.body}</p>
					<p className="info"><FaUser /> {comment.author}</p>
					<p className="info"><FaCalendar /> {formatDate(comment.timestamp)}</p>
				</div>
				<Vote handleVote={this.handleVote.bind(this)} voteScore={comment.voteScore} />
			</div>
		);
	}
};

export default connect(null)(Comment);