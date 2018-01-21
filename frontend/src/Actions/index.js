import * as API from '../Utils/api';
import { schema, normalize } from 'normalizr';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_POSTS = 'GET_POSTS';
export const VOTE_POST = 'VOTE_POST';

const category = new schema.Entity('categories', {}, { idAttribute: 'path' });
const categorySchema = { categories: [category] };

const post = new schema.Entity('posts', {}, { idAttribute: 'id' });
const postSchema = { posts: [post] };

export const getCategories = ({ categories }) => ({
	type: GET_CATEGORIES,
	categories
});

export const getPosts = (posts) => ({
	type: GET_POSTS,
	posts
});

export const fetchCategories = () => dispatch => (
	API.getCategories()
		.then(categories => dispatch(getCategories(categories)))
);

export const fetchPosts = () => dispatch => (
	API.getPosts()
		.then(posts => dispatch(getPosts(normalize({posts}, postSchema).entities.posts)))
);

export const vote = (post, option) => ({
	type: VOTE_POST,
	post,
	option
});


