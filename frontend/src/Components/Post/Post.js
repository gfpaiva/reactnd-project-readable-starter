import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatDate } from '../../Utils/helpers';
import { FaAngleUp, FaAngleDown, FaUser, FaCalendar } from 'react-icons/lib/fa';
import { vote } from '../../Actions';
import { votePost } from '../../Utils/api';

class Post extends Component {

	handleVote(e) {
		const post = this.props.post;
		const option = e.currentTarget.value;

		this.props.dispatch(vote(post, option));
		votePost(post.id, option);
	}


	render() {
		const { post } = this.props;

		return (
			<div>
				<div>
					<h2>
						<Link to={`/${post.category}/${post.id}`}>
							{post.title}
						</Link>
					</h2>
					<p><FaUser /> {post.author}</p>
					<p><FaCalendar /> {formatDate(post.timestamp)}</p>
				</div>
				<div>
					<button title="Vote Up" value="upVote" onClick={e => this.handleVote(e)}>
						<FaAngleUp />
					</button>
					<p>{post.voteScore}</p>
					<button title="Vote Down" value="downVote" onClick={e => this.handleVote(e)}>
						<FaAngleDown />
					</button>
				</div>
			</div>
		);
	}
};

export default connect(null)(Post);