import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from '../Components/Post/Post';
import Sort from '../Components/Sort/Sort';
import { fetchPosts } from '../Actions';
import { values as _values } from 'lodash';

class Home extends Component {

	componentDidMount() {
		this.props.dispatch(fetchPosts());
	};

	render() {
		const { posts } = this.props;

		return (
			<div className="container">
				<Sort />
				{(posts && posts.length > 0) &&
				posts.map(post => (
					<Post {...{post}} key={post.id} />
				))}
			</div>
		);
	};
};

const mapStateToProps = ({ posts, sort }) => {
	const postsArray = _values(posts).sort((a, b) => {
		if (sort.order === "desc") {
			return parseFloat(b[sort.value]) - parseFloat(a[sort.value]);
		} else {
			return parseFloat(a[sort.value]) - parseFloat(b[sort.value]);
		}
	});

	return {
		posts: postsArray.filter(posts => !posts.deleted)
	}
}

export default connect(mapStateToProps)(Home);