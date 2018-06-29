import React, { Component } from 'react';
import { connect } from 'react-redux';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt } from '@fortawesome/fontawesome-free-solid';
import Select from 'react-select';
import AnswerItem from './AnswerItem';


class QuestionItem extends Component {

	constructor(props) {
		super(props);
		this.state = {
			question: props.item.question,
			answer: props.item.answer,
			multi: true,
			value: [],
			isEdit: false,
			answersList: [{ answer:"", correct:"" }],
			answersListLength: 1,
		};
		this.state.multiValue = categoryList(props.item.category);

		this.handleOnChange = this.handleOnChange.bind(this);
	}

	handleOnChange (value) {
		const { multi } = this.state;
		if (multi) {
			this.setState({ multiValue: value });
		} else {
			this.setState({ value });
		}
	}


	render() {
		const { question, answer, multi, multiValue, isEdit, answersList, editQuestion, editAnswer } = this.state;
		const { item, selectSet } = this.props;
		console.log("item.answer", item.answer)
		return (
			<div className="test">
					<div>{item.question}</div>
					{item.answer.map((item, index) => (
						<AnswerItem
							isDisabled
							key={index}
							item={item}
							updateAnswerList={this.updateAnswerList}
							index={index}
						/>
					))}

					<button className="button-image button-image_save" onClick={this.saveEdit}>
						<FontAwesomeIcon icon="plus" />
					</button>
			</div>
		);
	}
}
const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {

};


export default connect(mapStateToProps, mapDispatchToProps)(QuestionItem);
