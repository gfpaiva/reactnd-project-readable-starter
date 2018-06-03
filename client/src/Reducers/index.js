import { combineReducers } from 'redux';
import {
	GET_CATEGORIES,
	GET_POSTS,
	SET_POST,
	UPDATE_POST,
	DELETE_POST,
	VOTE_POST,
	SET_SCORE,
	GET_COMMENTS,
	SET_COMMENT,
	UPDATE_COMMENT,
	DELETE_COMMENT,
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
	const { posts, post, comment } = action;
	switch(action.type) {
		case GET_POSTS:
			return posts || state;
		case SET_POST:
		case UPDATE_POST:
			return {
				...state,
				[post.id]: post
			};
		case DELETE_POST:
			return {
				...state,
				[post.id]: {
					...state[post.id],
					deleted: true
				}
			};
		case SET_COMMENT:
			return {
				...state,
				[comment.parentId]: {
					...state[comment.parentId],
					commentCount: state[comment.parentId].commentCount + 1
				}
			};
		case DELETE_COMMENT:
			return {
				...state,
				[comment.parentId]: {
					...state[comment.parentId],
					commentCount: state[comment.parentId].commentCount - 1
				}
			};
		case VOTE_POST:
			return voteCase(state, action, 'post');
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
		case UPDATE_COMMENT:
			return {
				...state,
				[comment.id]: comment
			};
		case DELETE_COMMENT:
			return {
				...state,
				[comment.id]: {
					...state[comment.id],
					deleted: true
				}
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