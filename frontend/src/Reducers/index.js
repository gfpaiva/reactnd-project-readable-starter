import { combineReducers } from 'redux';
import {
	GET_CATEGORIES,
	GET_POSTS,
	VOTE_POST,
	SET_SCORE,
	GET_COMMENTS,
	SET_COMMENT,
	VOTE_COMMENT,
	UPDATE_LOADING
} from '../Actions';

const voteCase = (state, action, type) => {
	let newScore;

	if(action.option === 'upVote') {
		newScore = action[type].voteScore + 1;
	} else {
		newScore = action[type].voteScore - 1;
	}

	return {
		...state,
		[action[type].id]: {
			...state[action[type].id],
			voteScore: newScore
		}
	};
};

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
	const { posts, comment } = action;
	switch(action.type) {
		case GET_POSTS:
			return posts || state;
		case VOTE_POST:
			return voteCase(state, action, 'post');
		case SET_COMMENT:
			return {
				...state,
				[comment.parentId]: {
					...state[comment.parentId],
					commentCount: state[comment.parentId].commentCount + 1
				}
			};
		default:
			return state;
	}
};

const comments = (state = {}, action) => {
	const { comments, comment } = action;
	switch(action.type) {
		case GET_COMMENTS:
			return {
				...state,
				...comments
			};
		case SET_COMMENT:
			return {
				...state,
				[comment.id] : comment
			};
		case VOTE_COMMENT:
			return voteCase(state, action, 'comment');
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