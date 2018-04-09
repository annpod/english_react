import React, { Component } from 'react';
import { VoicePlayer, VoiceRecognition } from 'react-voice-components'
import { selectValues, arrays } from './../data/vocabulary';

class Vocabulary extends Component {

	constructor(props) {
		super(props);
		this.state = {
			set: selectValues[0].value,
			selectSet: selectValues,
			play: false,
		};
		this.state.data = arrays[this.state.set];
		this.state.world = arrays[this.state.set][0].en;

		this.updateSelect = this.updateSelect.bind(this);
		this.onEnd = this.onEnd.bind(this);
	}

updateSelect(event) {
	console.log(arrays[event.target.value]);
 this.setState({
	  set: event.target.value,
  	data: arrays[event.target.value],
		world: arrays[event.target.value][0].en
	 });
}
onEnd() {
	this.setState({ play: false });
}
	render() {
		const { set, play, selectSet, data, world } = this.state;
		console.log(selectSet);

		return (
			<div className="page-content">
					<button id="button-sound" className="button-sound" type="button"></button>
				<div id="Worlds">
				<h3>Translate</h3>
				<h4>Choose the Set</h4>
					<select onChange={this.updateSelect}>
					{selectSet.map((item, index) => (
						<option key={index} value={item.value}>{item.label}</option>
					))}
					</select>

					{play &&
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
						<input id="answer" type="text" />
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

export default Vocabulary;
