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
	updateQuestion
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
			question: props.item.question,
			answer: props.item.answer,
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

	componentWillReceiveProps(nextProps) {
		this.setState({
			multiValue: categoryList(nextProps.item.category),
			question: nextProps.item.question,
			answer: nextProps.item.answer
		})
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
		console.log("this.state.editAnswer", this.state.editAnswer);
		const answers = Object.assign([], this.state.isEdit ? this.state.editAnswer : this.state.answersList);
		answers[index] = answer;
		this.setState({ editAnswer: answers });
	}


	async saveEdit() {
		const { editAnswer, editQuestion, multiValue } = this.state;
		const { item } = this.props;
		let categoryVar = multiValue;
		const categoryArray = [];
		for (let category of categoryVar) {
			categoryArray.push(category.value);
		}
		const answer = editAnswer.filter((item => item.answer !== ""));
		const editQuestionVar = editQuestion.trim();
		if (editQuestionVar && categoryArray.length) {
			const body = {question: editQuestionVar, answer, category: categoryArray};
			console.log("body", body);
			this.setState({
				isEdit: false,
				editQuestion: "",
				editAnswer: []
			});
			await this.props.updateQuestion(item._id, body);
			this.props.getData();
		}
	}
	
	editQuestion(){
		const { item } = this.props;
		const options = [];
		item.category.forEach((item) => {options.push({ value: item, label: item })});
		this.handleOnChange(options);
		this.setState({
			isEdit: true,
			id: item._id,
			editQuestion: item.question,
			editAnswer: item.answer,
			multiValue: options,
		});
	}

	cancelEdit() {
		this.setState({
			isEdit: false
		})
	}

	render() {
		const { question, answer, multi, multiValue, isEdit, answersList, editQuestion, editAnswer } = this.state;
		const { item, selectSet } = this.props;
		console.log("item.answer", item.answer)
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
							<AnswerItem
								isDisabled
								key={index}
								item={item}
								updateAnswerList={this.updateAnswerList}
								index={index}
							/>
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
						<input className="input-question" name="editQuestion" value={editQuestion} onChange={this.updateInput}/>
						<br/>
						{editAnswer.map((item, index) => (
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
	updateQuestion
};


export default connect(mapStateToProps, mapDispatchToProps)(QuestionItem);
