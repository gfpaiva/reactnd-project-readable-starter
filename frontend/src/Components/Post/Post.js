import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../Utils/helpers';
import { FaAngleUp, FaAngleDown, FaUser, FaCalendar } from 'react-icons/lib/fa';

const Post = ({ post }) => {
	return (
		<div>
			<div>
				<h2>
					<Link to={`/${post.category}/${post.id}`}>
						{post.title}
					</Link>
				</h2>
				<p><FaUser /> {post.author}</p>
				<p><FaCalendar /> {formatDate(post.timestamp)}</p>
			</div>
			<div>
				<button title="Vote Up">
					<FaAngleUp />
				</button>
				<p>{post.voteScore}</p>
				<button title="Vote Up">
					<FaAngleDown />
				</button>
			</div>
		</div>
	);
};

export default Post;