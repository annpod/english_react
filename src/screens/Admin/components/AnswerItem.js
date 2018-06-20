import React, { Component } from 'react';
import { connect } from 'react-redux';


class AnswerItem extends Component {

	constructor(props) {
		super(props);
		this.state = {
			answer: "",
			correct: false,
		};

		this.updateInput = this.updateInput.bind(this);
		this.updateCheckbox = this.updateCheckbox.bind(this);
	}

	updateInput(event) {
		this.setState({[event.target.name]: event.target.value},
			this.props.updateAnswerList(this.props.index, {answer: event.target.value, correct: this.state.correct}));
	}

	updateCheckbox(event) {
		console.log("event.target.checked", event.target.checked);
		this.setState({ [event.target.name]: event.target.checked });
	}

	render() {
		const { answer, correct } = this.state;

		return (
			<div>
				<input className="input-answer" type="checkbox" name="correct" value={correct} onChange={this.updateCheckbox}/>
				<input className="input-question" name="answer" value={answer} onChange={this.updateInput}/>
			</div>
		);
	}
}
const mapStateToProps = () => ({
});

const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(AnswerItem);
