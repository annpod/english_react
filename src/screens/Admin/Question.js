import React, { Component } from 'react';
import { connect } from 'react-redux';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt } from '@fortawesome/fontawesome-free-solid';
import Select from 'react-select';
import NewQuestion from './components/NewQuestion';
import QuestionItem from './components/QuestionItem';
import Navigation from './components/Navigation';

import {
	addQuestion,
	categoryList,
	//deleteQuestion,
	getQuestionList,
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
		};

		this.getData = this.getData.bind(this);
		this.updateInput = this.updateInput.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
		this.updateAnswerList = this.updateAnswerList.bind(this);
	}

	componentWillMount() {
		this.getData();
	}

	async getData() {
		await this.props.getQuestionList();
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

	render() {
		const { multi, multiValue } = this.state;
		const { data, selectSet } = this.props;
		console.log("data", data);
		return (
			<div>
				<Navigation />
				<div className="page-content">
			
					Filter list
					<Select.Creatable
						multi={multi}
						options={selectSet}
						onChange={this.handleOnChange}
						value={multi ? multiValue : value}
					/>
					Question
					<NewQuestion getData={this.getData} />

					{data && data.map((item, index) =>(
						<QuestionItem item={item} key={index} getData={this.getData} />
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
	getQuestionList,
	//updateQuestion
};


export default connect(mapStateToProps, mapDispatchToProps)(Question);
