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
	getListQuestion,
	categoryList
} from "../../../selectors";

class QuestionItem extends Component {

	constructor(props) {
		super(props);
		this.state = {
			question: "",
			answer: "1111",
			multi: true,
			value: [],
			isEdit: false,
			answersList: [{ answer:"", correct:"" }],
			answersListLength: 1,
		};
		this.state.multiValue = categoryList(props.item.category);

		this.updateInput = this.updateInput.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
		this.addNewAnswer = this.addNewAnswer.bind(this);
		this.updateAnswerList = this.updateAnswerList.bind(this);
		this.saveEdit = this.saveEdit.bind(this);
		this.cancelEdit = this.cancelEdit.bind(this);
		this.editQuestion = this.editQuestion.bind(this);
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

	saveEdit() {
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
				console.log("body", body);
				this.props.addQuestion(body);
			}
		}
		this.props.getData();
	}

	editQuestion() {
		this.setState({
			isEdit: true
		})
	}

	cancelEdit() {
		this.setState({
			isEdit: false
		})
	}

	render() {
		const { question, answer, multi, multiValue, isEdit, answersList } = this.state;
		const { item, selectSet } = this.props;
		return (
			<div className="test">
				<Select.Creatable
					multi={multi}
					disabled={!isEdit}
					options={selectSet}
					onChange={this.handleOnChange}
					value={multi ? multiValue : value}
				/>
				{!isEdit ?
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
					:
					<div>
						<input className="input-question" name="question" value={question} onChange={this.updateInput}/>
						<button className="button-image button-image_save" onClick={this.saveNewQuestion}>
							<FontAwesomeIcon icon="save"/>
						</button>
						<br/>
						{item.answer.map((item, index) => (
							<AnswerItem
								key={index}
								item={item}
								updateAnswerList={this.updateAnswerList}
								index={index}
							/>
						))}
						<span>
							<button className="button-image button-image_save" onClick={this.saveEdit}>
								<FontAwesomeIcon icon="save" />
							</button>
							<button className="button-image button-image_cancel" onClick={this.cancelEdit}>
								<FontAwesomeIcon icon="ban" />
							</button>
						</span>

					</div>
				}

			</div>
		);
	}
}
const mapStateToProps = (state) => ({
	selectSet: groupSelectQuestion(state),
	data : getListQuestion(state),
});

const mapDispatchToProps = {
	addQuestion,
	//deleteQuestion,
	getQuestionList,
	//updateQuestion
};


export default connect(mapStateToProps, mapDispatchToProps)(QuestionItem);
