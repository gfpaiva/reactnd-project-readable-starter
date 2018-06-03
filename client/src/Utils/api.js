const api = '//localhost:3001';

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
	token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
	'Accept': 'application/json',
	'Authorization': token
}

const getFetch = (endpoint = '') => {
	return fetch(`${api}${endpoint}`, {headers})
		.then(res => res.json())
		.then(data => data)
		.catch(error => {
			throw new Error(error);
		});
};

const setFetch = (endpoint = '', payload = {}, method = 'POST') => {
	return fetch(`${api}${endpoint}`, {
			method,
			headers: {
				...headers,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		})
		.then(res => res.json())
		.catch(error => {
			throw new Error(error);
		});
};

const delFetch = (endpoint = '') => {
	return fetch(`${api}${endpoint}`, {
		headers,
		method: 'DELETE'
	})
	.then(res => res.json())
	.then(data => data)
	.catch(error => {
		throw new Error(error);
	});
};

// CATEGORIES
export const getCategories = () => getFetch(`/categories`);
export const getPostsByCategory = (category) => getFetch(`/${category}/posts`)

// POSTS
export const getPosts = () => getFetch(`/posts`);
export const setPost = post => setFetch(`/posts`, post);
export const votePost = (id, option) => setFetch(`/posts/${id}`, { option });
export const editPost = (id, info) => setFetch(`/posts/${id}`, info, 'PUT');
export const getPostById = id => getFetch(`/posts/${id}`);
export const getCommentsByPostId = id => getFetch(`/posts/${id}/comments`);
export const deletePostById = id => delFetch(`/posts/${id}`);

// COMMENTS
export const getCommentById = id => getFetch(`/comments/${id}`);
export const setComment = commentary => setFetch(`/comments`, commentary);
export const voteComment = (id, option) => setFetch(`/comments/${id}`, { option });
export const editComment = (id, info) => setFetch(`/comments/${id}`, info, 'PUT');
export const deleteCommentById = id => delFetch(`/comments/${id}`);