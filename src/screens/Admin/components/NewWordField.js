import React from 'react';

const NewWordField = ({en, ru, updateInput}) => (
	<div>
		<div className="field-group">
			<label>English</label>
			<input name="en" value={en} onChange={updateInput}/>
		</div>
		<div className="field-group">
			<label>Native</label>
			<input name="ru" value={ru} onChange={updateInput}/>
		</div>
	</div>
)
export default NewWordField;