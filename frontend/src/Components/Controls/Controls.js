import React from 'react';
import { FaEdit, FaTrashO } from 'react-icons/lib/fa';
import PropTypes from 'prop-types';

import './Controls.css';

const Controls = ({ handleDelete, changeEdit }) => {

	return (
		<div className="actions">
			<button onClick={e => changeEdit(e)}><FaEdit /> <strong>Edit</strong></button>
			&nbsp;
			<button onClick={e => handleDelete(e)}><FaTrashO /> <strong>Delete</strong></button>
		</div>
	);
};

Controls.propTypes = {
	changeEdit: PropTypes.func.isRequired,
	handleDelete: PropTypes.func.isRequired
};

export default Controls;