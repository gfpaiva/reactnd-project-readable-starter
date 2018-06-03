import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CommentEdit extends Component {
	state ={
		body: this.props.comment.body
	};

	componentDidMount() {
		this.input.focus();
	}

	bodyChange = (e) => {
		this.setState({
			body: e.target.value
		});
	};

	render() {
		const { changeEdit, handleEdit } = this.props;

		return (
			<div className="comment-edit">
				<textarea
					className="comment-edit__area"
					placeholder="Comment content"
					maxLength="200"
					required
					onChange={this.bodyChange}value={this.state.body}
					ref={input => this.input = input}
				></textarea><br />

				<button className="btn edit__btn comment-edit__btn" onClick={e => handleEdit(this.state.body)}>Save</button>

				<button className="btn btn--sec edit__btn comment-edit__btn" onClick={e => changeEdit(e, this.textInput)}>Cancel</button>
			</div>
		);
	};
};

CommentEdit.propTypes = {
	comment: PropTypes.object.isRequired,
	changeEdit: PropTypes.func.isRequired,
	handleEdit: PropTypes.func.isRequired
};

export default CommentEdit;