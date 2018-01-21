import { combineReducers } from 'redux';
import {
	GET_CATEGORIES,
	GET_POSTS,
	VOTE_POST
} from '../Actions';

const categories = (state = [], action) => {
	const { categories } = action;
	switch(action.type) {
		case GET_CATEGORIES:
			return categories;
		default:
			return state;
	}
};

const posts = (state = {}, action) => {
	const { posts, post, option } = action;
	switch(action.type) {
		case GET_POSTS:
			return posts;
		case VOTE_POST:
			if(option === 'upVote') {
				post.voteScore = post.voteScore + 1;
			} else {
				post.voteScore = post.voteScore - 1;
			}
			return state;
		default:
			return state;
	}
};

export default combineReducers({
	categories,
	posts
});