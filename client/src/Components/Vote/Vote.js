import React from 'react';
import { FaThumbsOUp, FaThumbsODown } from 'react-icons/lib/fa';
import PropTypes from 'prop-types';

const Vote = ({ handleVote, voteScore }) => {
	return (
		<div className="post__vote">
			<p>
				Vote Score: <strong>{voteScore}</strong>
			</p>

			<button
				className="post__button"
				title="Vote Up"
				value="upVote"
				onClick={e => handleVote(e)}
			>
				<FaThumbsOUp /> <span>+</span>
			</button>

			<button
				className="post__button"
				title="Vote Down"
				value="downVote"
				onClick={e => handleVote(e)}
			>
				<FaThumbsODown /> <span>-</span>
			</button>
		</div>
	);
};

Vote.propTypes = {
	handleVote: PropTypes.func.isRequired,
	voteScore: PropTypes.number.isRequired
};

export default Vote;