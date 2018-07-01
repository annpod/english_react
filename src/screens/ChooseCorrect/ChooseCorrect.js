import React, { Component } from 'react';
import { connect } from 'react-redux';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt } from '@fortawesome/fontawesome-free-solid';
import Select from 'react-select';
import Button from '../Components/Button';
import NewQuestion from '../Admin/components/NewQuestion';
import QuestionItem from './QuestionItem';
import SubjectNavigation from '../Admin/components/SubjectNavigation';

import {
	categoryList,
	getQuestionListBySubject,
} from "../../actions/question";

import {
	groupSelectQuestion,
	getListQuestion,
} from "../../selectors";


class ChooseCorrect extends Component {

	constructor(props) {
		super(props);
		this.state = {
			multi: true,
			value: [],
			subject: "",
			showErrors: false,
			answerList: [],
			error: [],
		};

		this.getData = this.getData.bind(this);
		this.updateInput = this.updateInput.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
		this.updateAnswerList = this.updateAnswerList.bind(this);
		this.setSubject = this.setSubject.bind(this);
		this.checkAnswers = this.checkAnswers.bind(this);
		this.getAnswers = this.getAnswers.bind(this);
		this.updateAnswerList = this.updateAnswerList.bind(this);
		this.showError = this.showError.bind(this);
		this.hideError = this.hideError.bind(this);

	}

	async getData() {
		const { subject } = this.state;
		await this.props.getQuestionListBySubject(subject);
		this.getAnswers();
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
		const categoryArray = [];
		for (let category of value) {
			categoryArray.push(category.value);
		}
		this.props.categoryList(categoryArray);
	}

	updateAnswerList(index, answer) {
		const answers = Object.assign([], this.state.answersList);
		answers[index] = answer;
		this.setState({ answersList: answers });
	}

	setSubject(subject) {
		this.hideError();
		this.setState({subject},
			() => this.getData()
		)
	}

	showError() {
		this.setState({ showErrors: true })
	}

	hideError() {
		this.setState({ showErrors: false })
	}

	getAnswers () {
		const { data } = this.props;
		let error = [];
		let answerList = [];
		answerList = JSON.parse(JSON.stringify(this.props.data));

		answerList.forEach((elem, index) => {
			error[index] = true;
			elem.answer.forEach((item, itemIndex) => {
				answerList[index].answer[itemIndex].correct = false;				
			});
		});
		this.setState({
			answerList,
			error,
		});	 	
	}

	updateAnswerList(questionIndex, answerIndex, checked) {
		const answerList = Object.assign([], this.state.answerList);
		answerList[questionIndex].answer[answerIndex].correct = checked;
		this.setState({ answerList });
		this.checkAnswers(answerList, questionIndex);
	}

	checkAnswers(answer, index) {		
		console.log("answer", answer[index]);
		const { data } = this.props;
		console.log("data[index]",this.props.data[index]);
		const error = Object.assign([], this.state.error);
		console.log("JSON.stringify(answer[index]", JSON.stringify(answer[index]));
		
		if( JSON.stringify(answer[index]) === JSON.stringify(data[index])) {
			error[index] = false;
		} else {
			error[index] = true;		
		}
		this.setState({ error })
	}

	render() {
		const { multi, multiValue, subject, showErrors, error, answerList } = this.state;
		const { data, selectSet } = this.props;
		console.log("data", data);
		return (
			<div>
				
				<SubjectNavigation onClick={this.setSubject} />
				<div className="page-content">

					Filter list
					<Select.Creatable
						multi={multi}
						options={selectSet}
						onChange={this.handleOnChange}
						value={multi ? multiValue : value}
					/>					

					{answerList.map((item, index) =>(
						<QuestionItem
							index={index}
							item={item}
							answer={item.answer}
							key={index}
							showErrors={showErrors}
							isError={error[index]}
							updateAnswerList={this.updateAnswerList}
						/>
					))}
					<Button
						type='icon'
						icon='check'
						value='check'
						onClick={this.showError}
					/>	
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	selectSet: groupSelectQuestion(state),
	data : getListQuestion(state),
});

const mapDispatchToProps = {
	categoryList,
	getQuestionListBySubject,
};


export default connect(mapStateToProps, mapDispatchToProps)(ChooseCorrect);
