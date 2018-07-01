import React, { Component } from 'react';
import { connect } from 'react-redux';

import Select from 'react-select';
import Button from '../../Components/Button';
import CheckBoxGroup from '../../Components/CheckBoxGroup';
import AnswerItem from '../components/AnswerItem';

import {
	addQuestion,
	getQuestionList,
} from "../../../actions/question";

import {
	groupSelectQuestion,
} from "../../../selectors";


class NewQuestion extends Component {

	constructor(props) {
		super(props);
		this.state = {
			question: "",
			multi: true,
			value: [],
			isEdit: true,
			answersList: [{ answer:"", correct: false }],
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
		const newItem = [{answer:"", correct: false}];
		this.setState({
			answersList: [...this.state.answersList, ...newItem],
		})
	}

	updateAnswerList(value, checked, index) {
		const answer = { answer: value, correct: checked };
		const answersList = Object.assign([], this.state.answersList);
		answersList[index] = answer;
		this.setState({ answersList });
	}

	saveNewQuestion() {
		const { answersList, question, multiValue } = this.state;
		const { subject } = this.props;
		const answer = answersList.filter((item => item.answer !== ""));
		if (multiValue) {
			let categoryVar = multiValue;
			const categoryArray = [];
			for (let category of categoryVar) {
				categoryArray.push(category.value);
			}
			if (question && categoryArray) {
				const body = {question, answer, category: categoryArray, subject};
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
					<Button
						type='icon'
						icon='save'
						value='save'
						onClick={this.saveNewQuestion}
					/>
				</div>
				<div className="new-answer__wrapp">
					{answersList.map((item, index) => (
						<CheckBoxGroup
							index={index}
							key={index}
							checked={answersList[index].correct}
							updateAnswerList={this.updateAnswerList}
							value={item.answer}
						/>
					))}
					<Button
						type='icon'
						icon='plus'
						value='save'
						onClick={this.addNewAnswer}
					/>	
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
