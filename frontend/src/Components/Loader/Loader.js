import React from 'react';
import ReactLoading from 'react-loading';
import './Loader.css';

const Loader = () => {
	return (
		<div className="loader__wrapper">
			<ReactLoading type="spin" color="#34435E" height='150px' width='150px' />
		</div>
	);
};

export default Loader;