import React, { Component } from 'react';
import { connect } from 'react-redux';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt } from '@fortawesome/fontawesome-free-solid';

class Test extends Component {

	constructor(props) {
		super(props);
		this.state = {
			question: "",
			answer: "1111",
		};
this.updateInput = this.updateInput.bind(this);
	}
	updateInput(event) {
		this.setState({[event.target.name]: event.target.value});
	}

	render() {
		const { question, answer } = this.state;

		return (
			<div className="test">
				Question
				<input className="input-question" name="question" value={question} onChange={this.updateInput}/>
				<button className="button-image button-image_save" onClick={()=>{}}>
					<FontAwesomeIcon icon="save" />
				</button>
				<br/>
				<input className="input-answer" type="checkbox" name="answerCorrect" value={answer} onChange={this.updateInput}/>
				<input className="input-question" name="answer" value={question} onChange={this.updateInput}/>
				<button className="button-image button-image_save" onClick={()=>{}}>
					<FontAwesomeIcon icon={faPlus} />
				</button>
			</div>
		);
	}
}


export default Test;
