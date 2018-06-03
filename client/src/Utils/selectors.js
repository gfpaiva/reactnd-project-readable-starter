import { createSelector } from 'reselect';
import { values as _values } from 'lodash';

const getPostArray = state => _values(state.posts);
const getCommentArray = state => _values(state.comments);
const getSort = state => state.sort;

export const getSortPosts = createSelector(
	[ getPostArray, getSort ],
	(post, sort) => {
		return post.slice().sort((a, b) => {
			if (sort.order === "desc") {
				return parseFloat(b[sort.value]) - parseFloat(a[sort.value]);
			} else {
				return parseFloat(a[sort.value]) - parseFloat(b[sort.value]);
			}
		}).filter(posts => !posts.deleted);
	}
);

export const getSortComments = createSelector(
	getCommentArray,
	(comments) => {
		return comments.slice().sort((a, b) => {
			return parseFloat(b.voteScore) - parseFloat(a.voteScore);
		}).filter(comments => !comments.deleted);
	}
);