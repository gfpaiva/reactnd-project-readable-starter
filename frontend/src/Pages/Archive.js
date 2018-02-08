import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from '../Components/Post/Post';
import Sort from '../Components/Sort/Sort';
import Loader from '../Components/Loader/Loader';
import { fetchPosts } from '../Actions';
import { values as _values } from 'lodash';
import PropTypes from 'prop-types';

class Archive extends Component {

	componentDidMount() {
		this.props.dispatch(fetchPosts());
	};

	render() {
		let { posts, match, isLoading } = this.props;

		if(match.params.category) posts = posts.filter(post => post.category === match.params.category);

		return (
			<div className="container">
				{isLoading && <Loader />}

				{(!posts || posts.length <= 0) && !isLoading && <p>No posts <span role="img" aria-label="Nerd Face">🤓</span></p>}

				{(posts && posts.length > 0) && !isLoading &&
				<div>
					{posts.length > 1 && <Sort />}
					{posts.map(post => (
						<Post
							{...{post}}
							key={post.id}
							showControls={false}
						/>
					))}
				</div>}
			</div>
		);
	};
};

Archive.propTypes = {
	dispatch: PropTypes.func.isRequired,
	posts: PropTypes.array.isRequired,
	isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = ({ posts, sort, isLoading }) => {
	const postsArray = _values(posts).sort((a, b) => {
		if (sort.order === "desc") {
			return parseFloat(b[sort.value]) - parseFloat(a[sort.value]);
		} else {
			return parseFloat(a[sort.value]) - parseFloat(b[sort.value]);
		}
	}).filter(posts => !posts.deleted);

	return {
		posts: postsArray,
		isLoading
	}
}

export default connect(mapStateToProps)(Archive);