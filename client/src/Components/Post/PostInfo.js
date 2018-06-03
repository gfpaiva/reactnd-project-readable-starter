import React from 'react';
import { formatDate } from '../../Utils/helpers';
import { FaUser, FaCalendar, FaCommentsO } from 'react-icons/lib/fa';
import PropTypes from 'prop-types';

const PostInfo = ({ post }) => {
	return (
		<div>
			<p className="info"><FaUser /> {post.author}</p>
			<p className="info"><FaCalendar /> {formatDate(post.timestamp)}</p>
			<p className="info"><FaCommentsO /> {post.commentCount}</p>
		</div>
	);
};

PostInfo.propTypes = {
	post: PropTypes.object.isRequired
};


export default PostInfo;