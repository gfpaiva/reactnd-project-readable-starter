import React, { Component } from 'react';
import { connect } from 'react-redux';
import Vote from '../Vote/Vote';
import Controls from '../Controls/Controls';
import CommentEdit from './CommentEdit';
import { formatDate } from '../../Utils/helpers';
import { FaUser, FaCalendar } from 'react-icons/lib/fa';
import { voteComment, updateComment, deleteComment } from '../../Actions';
import PropTypes from 'prop-types';

import './Comment.css';

class Comment extends Component {
	state = {
		editMode: false
	};

	handleVote(e) {
		const { comment } = this.props;
		const option = e.currentTarget.value;

		this.props.dispatch(voteComment(comment, option));
	};

	handleDelete = e => {
		e.preventDefault();

		const { comment, dispatch } = this.props;

		if(window.confirm(`Delete Commentary?`)) {
			dispatch(deleteComment(comment))
		}
	};

	handleEdit = body => {
		const { comment, dispatch } = this.props;

		let newComment = {
			...comment,
			body
		};

		dispatch(updateComment(newComment));

		this.setState({
			editMode: false
		});
	};

	changeEdit = (e) => {
		this.setState({
			editMode: !this.state.editMode
		});
	};


	render() {
		const { comment } = this.props;
		const { editMode } = this.state;

		return (
			<div className="comment__wrapper wrapper">
				<div className="comment__infos">
					<p className="info"><FaUser /> {comment.author}</p>
					<p className="info"><FaCalendar /> {formatDate(comment.timestamp)}</p>

					{!editMode && <p className="comment__body">{comment.body}</p>}
					{editMode && (
						<CommentEdit
							{...{comment}}
							changeEdit={this.changeEdit}
							handleEdit={this.handleEdit}
						/>
					)}

					{comment.author === 'gfpaiva' && !editMode &&(
						<Controls
							handleDelete={this.handleDelete}
							changeEdit={this.changeEdit}
						/>
					)}
				</div>

				<Vote
					handleVote={this.handleVote.bind(this)}
					voteScore={comment.voteScore}
				/>
			</div>
		);
	}
};

Comment.propTypes = {
	dispatch: PropTypes.func.isRequired,
	comment: PropTypes.object.isRequired
};

export default connect(null)(Comment);