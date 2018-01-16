import { combineReducers } from 'redux';
import {
	GET_CATEGORIES,
	GET_POSTS
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
	const { posts } = action;
	switch(action.type) {
		case GET_POSTS:
			return posts;
		default:
			return state;
	}
};

export default combineReducers({
	categories,
	posts
});