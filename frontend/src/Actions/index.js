import * as API from '../Utils/api';
import { schema, normalize } from 'normalizr';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_POSTS = 'GET_POSTS';
export const SET_POST = 'SET_POST';
export const DELETE_POST = 'DELETE_POST';
export const VOTE_POST = 'VOTE_POST';
export const SET_SCORE = 'SET_SCORE';
export const GET_COMMENTS = 'GET_COMMENTS';
export const SET_COMMENT = 'SET_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';
export const UPDATE_LOADING = 'UPDATE_LOADING';


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
const post = new schema.Entity('posts');
const postSchema = { posts: [post] };

export const getPosts = (posts) => ({
	type: GET_POSTS,
	posts
});
export const fetchPosts = () => dispatch => {
	dispatch(changeLoader(true));

	return API.getPosts()
			.then(posts => dispatch(getPosts(normalize({posts}, postSchema).entities.posts)))
			.then(() => dispatch(changeLoader(false)));
};
export const fetchPostById = id => dispatch => {
	dispatch(changeLoader(true));

	return API.getPostById(id)
			.then(post => dispatch(getPosts(normalize({posts: [post]}, postSchema).entities.posts)))
			.then(() => dispatch(changeLoader(false)));
};
export const votePost = (post, option) => {
	API.votePost(post.id, option);

	return	{
		type: VOTE_POST,
		post,
		option
	};
};
export const setPost = post => {
	API.setPost(post);

	return	{
		type: SET_POST,
		post
	};
};
export const deletePost = post => {
	API.deletePostById(post.id);

	return	{
		type: DELETE_POST,
		post
	};
};


// ***Comments
const comment = new schema.Entity('comments');
const commentSchema = { comments: [comment] };

export const getComments = (comments) => ({
	type: GET_COMMENTS,
	comments
});
export const fetchCommentsByPostId = id => dispatch => {
	dispatch(changeLoader(true));

	return API.getCommentsByPostId(id)
			.then(comments => dispatch(getComments(normalize({comments}, commentSchema).entities.comments)))
			.then(() => dispatch(changeLoader(false)));
};
export const voteComment = (comment, option) => {
	API.voteComment(comment.id, option);

	return	{
		type: VOTE_COMMENT,
		comment,
		option
	};
};
export const setComment = comment => {
	API.setComment(comment);

	return	{
		type: SET_COMMENT,
		comment
	};
};
export const deleteComment = comment => {
	API.deleteCommentById(comment.id);

	return	{
		type: DELETE_COMMENT,
		comment
	};
};


// ***SORT
export const sort = sort => ({
	type: SET_SCORE,
	sort
});


// *** LOADING
export const changeLoader = (isLoading = false) => ({
	type: UPDATE_LOADING,
	isLoading
});