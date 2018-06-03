import React, { Component } from 'react';
import PostInfo from './PostInfo';
import PropTypes from 'prop-types';

class PostEdit extends Component {
	state ={
		title: this.props.post.title,
		body: this.props.post.body
	};

	componentDidMount() {
		this.input.focus();
	}

	titleChange = (e) => {
		this.setState({
			title: e.target.value
		});
	};

	bodyChange = (e) => {
		this.setState({
			body: e.target.value
		});
	};

	render() {
		const { post, changeEdit, handleEdit } = this.props;

		return (
			<div className="post-edit">
				<input
					className="post-edit__input"
					type="text"
					value={this.state.title}
					placeholder="Post Title"
					onChange={this.titleChange}
					required
					ref={input => this.input = input}
				/><br />

				<PostInfo {...{post}}/>

				<textarea
					className="post-edit__area"
					placeholder="Post content"
					maxLength="200"
					required
					onChange={this.bodyChange}
					value={this.state.body}
				></textarea><br />

				<button className="btn edit__btn post-edit__btn" onClick={e => handleEdit(this.state.title, this.state.body)}>Save</button>
				<button className="btn btn--sec edit__btn post-edit__btn" onClick={e => changeEdit(e)}>Cancel</button>
			</div>
		);
	};
};

PostEdit.propTypes = {
	post: PropTypes.object.isRequired,
	changeEdit: PropTypes.func.isRequired,
	handleEdit: PropTypes.func.isRequired
};

export default PostEdit;