import { combineReducers } from 'redux';
import {
	GET_CATEGORIES,
	GET_POSTS,
	VOTE_POST,
	SET_SCORE,
	GET_COMMENTS,
	UPDATE_LOADING
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
			return posts || state;
		case VOTE_POST:
			let newScore;

			if(option === 'upVote') {
				newScore = post.voteScore + 1;
			} else {
				newScore = post.voteScore - 1;
			}

			return {
				...state,
				[post.id]: {
					...state[post.id],
					voteScore: newScore
				}
			};
		default:
			return state;
	}
};

const comments = (state = {}, action) => {
	const { comments, comment, option } = action;
	switch(action.type) {
		case GET_COMMENTS:
			return comments || state;
		default:
			return state;
	}
};

const sort = (state = {value: 'voteScore', order: 'desc'}, action) => {
	const { sort } = action;
	switch(action.type) {
		case SET_SCORE:
			return {
				value: sort.value,
				order: sort.order
			};
		default:
			return state;
	}
};

const isLoading = (state = true, action) => {
	const { isLoading } = action;

	switch(action.type) {
		case UPDATE_LOADING:
			return isLoading;
		default:
			return state;
	}
};

export default combineReducers({
	categories,
	posts,
	comments,
	sort,
	isLoading
});