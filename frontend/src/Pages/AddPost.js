import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPost } from '../Actions/index';
import moment from 'moment';
import PropTypes from 'prop-types';

class AddPost extends Component {
	state = {
		postTitle: '',
		postBody: '',
		postCategory: ''
	};

	postTemplate = {
		id: null,
		timestamp: null,
		title: null,
		body: null,
		author: 'gfpaiva',
		category: null,
		voteScore: 1,
		deleted: false,
		commentCount: 0
	};

	titleChange = e => {
		this.setState({
			postTitle: e.target.value
		});
	};

	bodyChange = e => {
		this.setState({
			postBody: e.target.value
		});
	};

	categoryChange = e => {
		this.setState({
			postCategory: e.target.value
		});
	}

	savePost = e => {
		e.preventDefault();

		let newPost = {
			...this.postTemplate,
			id: btoa(moment().valueOf()),
			timestamp: moment().valueOf(),
			title: this.state.postTitle,
			body: this.state.postBody,
			category: this.state.postCategory
		};

		this.props.dispatch(setPost(newPost));

		this.setState({
			postTitle: '',
			postBody: '',
			postCategory: ''
		});

		this.props.history.push('/');
	};

	render() {
		const { categories } = this.props;

		return (
			<div className="container">
				<h2>Add Post</h2>
				<hr />
				<form onSubmit={this.savePost}>
					<input
						type="text"
						value={this.state.postTitle}
						placeholder="Post Title"
						onChange={this.titleChange}
						required
					/><br />

					{categories && categories.length > 0 &&
						<select
							required
							onChange={this.categoryChange}
							value={this.state.postCategory}
						>
							<option value="">Select a Category</option>
							{categories.map((category, index) => (
								<option key={`${category.name}-${index}`} value={category.name}>{category.name}</option>
							))}
						</select>
					}

					<textarea
						className="post__textarea"
						placeholder="Post content"
						rows="10"
						cols="80"
						maxLength="200"
						required
						onChange={this.bodyChange}
						value={this.state.postBody}
					></textarea><br />

					<button className="btn post__btn" type="submit">Save</button>
				</form>
			</div>
		);
	};
};

AddPost.propTypes = {
	dispatch: PropTypes.func.isRequired,
	categories: PropTypes.array.isRequired
};

const mapStateToProps = ({ categories }) => ({ categories });

export default connect(mapStateToProps)(AddPost);