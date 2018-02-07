import React from 'react';
import { FaEdit, FaTrashO } from 'react-icons/lib/fa';

import './Actions.css';

const Actions = ({ handleDelete }) => {

	return (
		<div className="actions">
			<button><FaEdit /> <strong>Editar</strong></button>
			&nbsp;
			<button onClick={e => handleDelete(e)}><FaTrashO /> <strong>Deletar</strong></button>
		</div>
	);
};

export default Actions;