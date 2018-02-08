import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';

const Footer = () => {
	return (
		<div>
			<div className="footer__wrapper">
				<footer className="footer__content container">
					<p>Made By: Guilherme Paiva. ReactND <span role="img" aria-label="Nerd Face">🤓</span></p>
				</footer>
			</div>
			<Link
				to="/add"
				className="btn btn--add"
				title="Add Post"
			><span>+</span></Link>
		</div>
	);
};

export default Footer;