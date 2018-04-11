import React, { Component } from 'react';
import { connect } from 'react-redux';
import { VoicePlayer, VoiceRecognition } from 'react-voice-components';
import { initData } from '../../actions/vocabulary';

class Vocabulary extends Component {

	constructor(props) {
		super(props);
		this.state = {
			set: [],
			playVoice: false,
			world: "",
			worldAnswer: ""
		};

		this.updateSelect = this.updateSelect.bind(this);
		this.updateInput = this.updateInput.bind(this);
		this.onEnd = this.onEnd.bind(this);
	}

	componentDidMount(){
		this.props.initData();
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			set: nextProps.selectSet[0].value,
			date: nextProps.array[nextProps.selectSet[0].value],
			world: nextProps.array[nextProps.selectSet[0].value][0].en,
		})
	}

	updateSelect(event) {
		const {array} = this.props;
		this.setState({
			set: event.target.value,
			data: array[event.target.value],
			world: array[event.target.value][0].en
		});
	}

	updateInput(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	onEnd() {
		this.setState({ play: false });
	}

	render() {
		const { set, playVoice, world, data, worldAnswer } = this.state;
		const { selectSet } = this.props;
		console.log('worldAnswer',worldAnswer);
		return (
			<div className="page-content">
				<button id="button-sound" className="button-sound" type="button"></button>
				<div id="Worlds">
				<h3>Translate</h3>
				<h4>Choose the Set</h4>
					<select onChange={this.updateSelect}>
					{selectSet && selectSet.map((item, index) => (
						<option key={index} value={item.value}>{item.label}</option>
					))}
					</select>

					{playVoice &&
						<VoicePlayer
							onEnd={this.onEnd}
							play
							text={set}
						/>
					}

					<select  id="language">
						<option value="ru">Native</option>
						<option value="en">English</option>
					</select>
					<div id="world">{world}</div>
					<form id="form">
						<input id="answer" type="text" name="worldAnswer" value={worldAnswer} onChange={this.updateInput}/>
						<div className="answer-result"></div>
						<button id="button" className="button-check" type="submit"></button>
						<button id="button-next" className="button-new" type="button"></button>
						<button id="button-speak" className="button-speak" type="button">Speak</button>
					</form>
					<button id="button-answer" className="answer" type="button">Show Answer</button>
					<span id="right-answer"></span>

				<h3>Make up the word</h3>
				<button id="button-letters" className="button-newset" type="button">New word</button>
				<button id="button-speak-letters" className="button-speak" type="button">Speak</button>
				<div id='letters'>

				</div>
				<h3>Match</h3>
				<button id="button-pairs" className="button-newset" type="button">New Set</button>
				<div id='questions'>
				</div>
			</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	selectSet: state.vocabulary.selectValues,
	array: state.vocabulary.arrays,
});

const mapDispatchToProps = {
	initData
};

export default connect(mapStateToProps, mapDispatchToProps)(Vocabulary);
