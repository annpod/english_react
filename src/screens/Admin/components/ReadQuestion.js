import React, { Component } from 'react';
import { connect } from 'react-redux';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt } from '@fortawesome/fontawesome-free-solid';
import Select from 'react-select';
import AnswerItem from '../components/AnswerItem';

class ReadQuestion extends Component {

	constructor(props) {
		super(props);
		this.state = {
			
		};

		this.state.multiValue = categoryList(props.item.category);
	}

	render() {
		const { question, answer, multi, multiValue, isEdit, answersList } = this.state;
		const { item, selectSet } = this.props;
		return (
			<div className="test">
				<Select.Creatable
					multi={multi}
					disabled
					options={selectSet}
					onChange={this.handleOnChange}
					value={multi ? multiValue : value}
				/>
				<div>
					<div>{item.question}</div>
					{item.answer.map((item, index) => (
						<div className="checkbox">
							<input className="input-question" name="question" type="checkbox" disabled checked={item.correct} />
							<label htmlFor="question">{item.answer}</label>
						</div>
					))}
					<button className="button-image button-image_save" onClick={this.editQuestion}>
						<FontAwesomeIcon icon={faPencilAlt} />
					</button>
					<button onClick={this.deleteWord} className="button-image button-image_delete">
						<FontAwesomeIcon icon="trash-alt" />
					</button>
				</div>

			</div>
		);
	}
}
const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(ReadQuestion);
