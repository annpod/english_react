import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../Components/Button';
import Select from 'react-select';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import AnswerItem from './AnswerItem';
import CheckBoxGroup from '../Components/CheckBoxGroup';
import {
	categoryList
} from "../../selectors";

class QuestionItem extends Component {

	constructor(props) {
		super(props);
		this.state = {
		};

		this.updateAnswerList = this.updateAnswerList.bind(this);
	}


	updateAnswerList(value, checked, index) {
		this.props.updateAnswerList(this.props.index, index, checked);
	}

	render() {
		const { item, showErrors, updateAnswerList, isError, answer } = this.props;
		//console.log("answer", answer);
		return (
			<div className="test">
					<div>{item.question}</div>
					{showErrors && isError && <div>error<FontAwesomeIcon icon="times" /></div>}
					{answer.map((answerItem, answerIndex) => (
						<CheckBoxGroup
							index={answerIndex}
							key={`${answerIndex}1`}
							checked={answerItem.correct}
							updateAnswerList={this.updateAnswerList}
							value={answerItem.answer}
						/>
					))}
									
			</div>
		);
	}
}

export default QuestionItem;
