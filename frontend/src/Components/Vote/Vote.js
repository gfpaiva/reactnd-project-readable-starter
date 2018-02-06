import React from 'react';
import { connect } from 'react-redux';
import { FaAngleUp, FaAngleDown } from 'react-icons/lib/fa';

const Vote = ({ handleVote, voteScore }) => {
	return (
		<div className="post__vote">
			<button className="post__button" title="Vote Up" value="upVote" onClick={e => handleVote(e)}>
				<FaAngleUp />
			</button>
			<p><strong>{voteScore}</strong></p>
			<button className="post__button" title="Vote Down" value="downVote" onClick={e => handleVote(e)}>
				<FaAngleDown />
			</button>
		</div>
	);
};

export default connect(null)(Vote);