import React, { Component } from 'react';
import { connect } from 'react-redux';


class AnswerItem extends Component {

	constructor(props) {
		super(props);
		this.state = {
			answer: props.item.answer || "",
			correct: !!props.item.correct || false,
		};

		this.updateInput = this.updateInput.bind(this);
		this.updateCheckbox = this.updateCheckbox.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({			
			answer: nextProps.item.answer || "",
			correct: !!nextProps.item.correct || false,
		})
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
		const { isDisabled } = this.props;

		return (
			<div className="checkbox-group">
				<label className="checkbox-group__label" >
					<input type="checkbox" className="checkbox-input input-answer" disabled={isDisabled} name="correct" checked={correct} value={correct} onChange={this.updateCheckbox} />
					<span className="checkbox-mark" />
				</label>
				<input className="input-question" name="answer" value={answer} disabled={isDisabled} onChange={this.updateInput}/>
			</div>				
		);
	}
}
const mapStateToProps = () => ({
});

const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(AnswerItem);
