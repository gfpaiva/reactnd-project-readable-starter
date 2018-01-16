import * as API from '../Utils/api';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_POSTS = 'GET_POSTS';

export const getCategories = ({ categories }) => ({
	type: GET_CATEGORIES,
	categories
});

export const fetchCategories = () => dispatch => (
	API.getCategories()
		.then(categories => dispatch(getCategories(categories)))
);

export const getPosts = (posts) => ({
	type: GET_POSTS,
	posts
});

export const fetchPosts = () => dispatch => (
	API.getPosts()
		.then(posts => dispatch(getPosts(posts)))
);
