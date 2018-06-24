import React, { Component } from 'react';
import { connect } from 'react-redux';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt } from '@fortawesome/fontawesome-free-solid';
import Select from 'react-select';
import NewQuestion from './components/NewQuestion';
import QuestionItem from './components/QuestionItem';
import Navigation from './components/Navigation';
import SubjectNavigation from './components/SubjectNavigation';

import {
	addQuestion,
	categoryList,
	//deleteQuestion,
	getQuestionListBySubject,
	//updateQuestion	
} from "../../actions/question";

import {
	groupSelectQuestion,
	getListQuestion,
} from "../../selectors";


class Question extends Component {

	constructor(props) {
		super(props);
		this.state = {
			multi: true,
			value: [],
			subject: "",
		};

		this.getData = this.getData.bind(this);
		this.updateInput = this.updateInput.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
		this.updateAnswerList = this.updateAnswerList.bind(this);
		this.setSubject = this.setSubject.bind(this);
		
	}

	componentWillMount() {	
	}

	async getData() {
		const { subject } = this.state;		
		await this.props.getQuestionListBySubject(subject);		
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
		console.log("categoryArray", categoryArray);
		this.props.categoryList(categoryArray);
	}

	updateAnswerList(index, answer) {
		const answers = Object.assign([], this.state.answersList);
		answers[index] = answer;
		this.setState({ answersList: answers });
	}

	setSubject(subject) {
	this.setState({subject},
		() => this.getData()
		)	
	}

	render() {
		const { multi, multiValue, subject } = this.state;
		const { data, selectSet } = this.props;
		console.log("data", data);
		return (
			<div>
				<Navigation />
				<SubjectNavigation onClick={this.setSubject} />
				<div className="page-content">
			
					Filter list
					<Select.Creatable
						multi={multi}
						options={selectSet}
						onChange={this.handleOnChange}
						value={multi ? multiValue : value}
					/>
					Question
					<NewQuestion getData={this.getData} subject={subject} />

					{data && data.map((item, index) =>(
						<QuestionItem item={item} key={index} getData={this.getData} subject={subject}/>
					))}
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
	addQuestion,
	categoryList,
	//deleteQuestion,
	getQuestionListBySubject,
	//updateQuestion
};


export default connect(mapStateToProps, mapDispatchToProps)(Question);
