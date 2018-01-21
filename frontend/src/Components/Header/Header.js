import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FaBook from 'react-icons/lib/fa/book';

import './Header.css';

const Header = ({ categories }) => {
	return (
		<div className="header__wrapper">
			<header className="header__content container">
				<h1 className="header__title">
					<Link to="/">
						<FaBook />
						REACTND<strong className="header__strong">READABLE</strong>
					</Link>
				</h1>

				{(categories && categories.length > 0) && (
					<div>
						<span className="header__list-title header__strong">Categories: </span>
						<ul className="header__list">
							{categories.map(category => (
								<li className="header__item" key={category.name}>
									<Link className="header__link" to={`/${category.name}`}>
										{category.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
				)}
			</header>
		</div>
	);
};

const mapStateToProps = ({ categories }) => {
	return {
		categories
	}
};

export default connect(mapStateToProps)(Header);