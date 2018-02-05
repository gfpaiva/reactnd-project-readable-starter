import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatDate } from '../../Utils/helpers';
import { FaAngleUp, FaAngleDown, FaUser, FaCalendar } from 'react-icons/lib/fa';
import { vote } from '../../Actions';

class Comment extends Component {

	handleVote(e) {
		const post = this.props.post;
		const option = e.currentTarget.value;

		this.props.dispatch(vote(post, option));
	};


	render() {
		const { comment } = this.props;

		return (
			<div>
				<div>
					<p>{comment.body}	</p>
					<p><FaUser /> {comment.author}</p>
					<p><FaCalendar /> {formatDate(comment.timestamp)}</p>
				</div>
				<div>
					<button title="Vote Up" value="upVote" onClick={e => this.handleVote(e)}>
						<FaAngleUp />
					</button>
					<p>{comment.voteScore}</p>
					<button title="Vote Down" value="downVote" onClick={e => this.handleVote(e)}>
						<FaAngleDown />
					</button>
				</div>
			</div>
		);
	}
};

export default connect(null)(Comment);