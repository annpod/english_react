import React from 'react';

const CheckBoxGroup = ({ index, value, checked, updateAnswerList, disabled, disableInput }) => (
	<div className="checkbox-group">
		<label className="checkbox-group__label" >
			<input
				type="checkbox" 
				className="checkbox-input input-answer" 
				disabled={disabled} 
				name="correct" 
				checked={checked} 
				value={checked} 
				index={index}
				onChange={(event)=>updateAnswerList(value, event.target.checked, index)}				
			/>
			<span className="checkbox-mark" />
		</label>
		<input
			className="input-question"
			name="answer"
			type="text"
			index={index}
			value={value}
			disabled={disabled || disableInput}
			onChange={(event)=>updateAnswerList(event.target.value, checked, index)}
		/>
	</div>		
)
export default CheckBoxGroup;