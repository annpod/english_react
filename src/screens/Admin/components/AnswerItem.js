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
		this.setState({[event.target.name]: event.target.value});
		this.props.updateAnswerList(this.props.index, { answer: event.target.value, correct: this.state.correct });
	}

	updateCheckbox(event) {
		console.log("event.target.name",event.target.name);
		this.setState({ [event.target.name]: event.target.checked });
		this.props.updateAnswerList(this.props.index, { answer: this.state.answer, correct: event.target.checked });
	}

	render() {
		const { answer, correct } = this.state;

		return (
			<div className="checkbox-group">
				<label className="checkbox-group__label" >
					<input type="checkbox" className="checkbox-input input-answer" name="correct" value={correct} onChange={this.updateCheckbox} />
					<span className="checkbox-mark" />
				</label>
				<input className="input-question" name="answer" value={answer} onChange={this.updateInput}/>
			</div>
			// <div className="checkbox-group">
			// 	<div className="checkbox">
			// 		<label>
			// 			<input className="input-answer" type="checkbox" name="correct" value={correct} onChange={this.updateCheckbox}/>
			// 		</label>
			// 	</div>
			// 	<input className="input-question" name="answer" value={answer} onChange={this.updateInput}/>
			// </div>
		);
	}
}
const mapStateToProps = () => ({
});

const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(AnswerItem);