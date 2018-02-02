import * as API from '../Utils/api';
import { schema, normalize } from 'normalizr';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_POSTS = 'GET_POSTS';
export const VOTE_POST = 'VOTE_POST';
export const SET_SCORE = 'SET_SCORE';


const post = new schema.Entity('posts');
const postSchema = { posts: [post] };

// ***CATEGORIES
export const getCategories = ({ categories }) => ({
	type: GET_CATEGORIES,
	categories
});
export const fetchCategories = () => dispatch => (
	API.getCategories()
		.then(categories => dispatch(getCategories(categories)))
);


// ***POSTS
export const getPosts = (posts) => ({
	type: GET_POSTS,
	posts
});
export const fetchPosts = () => dispatch => (
	API.getPosts()
		.then(posts => dispatch(getPosts(normalize({posts}, postSchema).entities.posts)))
);
export const fetchPostById = id => dispatch => (
	API.getPostById(id)
		.then(post => dispatch(getPosts(normalize({posts: [post]}, postSchema).entities.posts)))
);
export const vote = (post, option) => ({
	type: VOTE_POST,
	post,
	option
});


// ***SORT
export const sort = sort => ({
	type: SET_SCORE,
	sort
});


