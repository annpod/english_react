import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt } from '@fortawesome/fontawesome-free-solid';

const Button = ({ value, label, type, icon, active, disabled, onClick }) => (
	<button className={`${type} ${icon} ${active && 'active'}`} value={value} onClick={onClick}>
		{icon && <FontAwesomeIcon icon={icon} />}
		{label && label	}	
	</button>
)
export default Button;