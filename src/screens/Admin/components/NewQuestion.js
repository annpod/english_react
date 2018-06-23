import React, { Component } from 'react';
import { connect } from 'react-redux';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt } from '@fortawesome/fontawesome-free-solid';
import Select from 'react-select';
import AnswerItem from '../components/AnswerItem';

import {
	addQuestion,
	//deleteQuestion,
	getQuestionList,
	//updateQuestion
} from "../../../actions/question";

import {
	groupSelectQuestion,
} from "../../../selectors";


class NewQuestion extends Component {

	constructor(props) {
		super(props);
		this.state = {
			question: "",
			answer: "1111",
			multi: true,
			value: [],
			isEdit: true,
			answersList: [{ answer:"", correct:"" }],
			answersListLength: 1,
		};

		this.updateInput = this.updateInput.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
		this.addNewAnswer = this.addNewAnswer.bind(this);
		this.updateAnswerList = this.updateAnswerList.bind(this);
		this.saveNewQuestion = this.saveNewQuestion.bind(this);
	}

	updateInput(event) {
		this.setState({[event.target.name]: event.target.value});
	}

	handleOnChange (value) {
		const { multi } = this.state;
		if (multi) {
			this.setState({ multiValue: value });
		} else {
			this.setState({ value });
		}
	}

	addNewAnswer() {
		const newItem = [{answer:"", correct:""}];
		this.setState({
			answersList: [...this.state.answersList, ...newItem],
		})
	}

	updateAnswerList(index, answer) {
		const answers = Object.assign([], this.state.answersList);
		answers[index] = answer;
		this.setState({ answersList: answers });
	}

	saveNewQuestion() {
		const { answersList, question, multiValue } = this.state;
		const answer = answersList.filter((item => item.answer !== ""));
		if (multiValue) {
			let categoryVar = multiValue;
			const categoryArray = [];
			for (let category of categoryVar) {
				categoryArray.push(category.value);
			}
			if (question && categoryArray) {
				const body = {question, answer, category: categoryArray};
				this.props.addQuestion(body);
			}
		}
		this.props.getData();
	}

	render() {
		const { question, answer, multi, multiValue, isEdit, answersList } = this.state;
		const { selectSet } = this.props;
		return (
			<div className="test">
				<div className="edit-question__wrapp">
					<Select.Creatable
						multi={multi}
						options={selectSet}
						onChange={this.handleOnChange}
						value={multi ? multiValue : value}
					/>
					<input className="input-question" name="question" value={question} onChange={this.updateInput}/>
					<button className="button-image button-image_save" onClick={this.saveNewQuestion}>
						<FontAwesomeIcon icon="save" />
					</button>
				</div>
				<div className="new-answer__wrapp">
					{answersList.map((item, index) => (
						<AnswerItem
							key={index}
							item={item}
							updateAnswerList={this.updateAnswerList}
							index={index}
						/>
					))}
					<button className="button-image button-image_save" onClick={this.addNewAnswer}>
						<FontAwesomeIcon icon={faPlus} />
					</button>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => ({
	selectSet: groupSelectQuestion(state),
});

const mapDispatchToProps = {
	addQuestion,
	//deleteQuestion,
	//updateQuestion
};


export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion);
