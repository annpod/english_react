import React, { Component } from 'react';
import { VoicePlayer } from 'react-voice-components';
import { randomIntFromInterval } from '../../selectors';

class Match extends Component {

	constructor(props) {
		super(props);
		this.state = {
			playVoice: false,
			textVoice: "",
			leftSet: [],
			rightSet: [],
			leftAnswer: "",
			rightAnswer: "",
			answerValue: [],
			itemIndex: 0,
		};

		this.onPlay = this.onPlay.bind(this);
		this.newSetPairs = this.newSetPairs.bind(this);
		this.setLeftAnswer = this.setLeftAnswer.bind(this);
		this.setRightAnswer = this.setRightAnswer.bind(this);
		this.compareAnswers = this.compareAnswers.bind(this);

	}

	onPlay(textVoice) {
		this.setState({
			playVoice: true,
			play: true,
			textVoice,
		})
	}

	newSetPairs() {
		const { data } = this.props;
		const { itemIndex } = this.state;
		this.setState({
			answerValue: [],
		});
		let shortData = [];
		let range = itemIndex;
		for (let i=0; i<6; i++){
			if(range < data.length) {
				shortData.push(data[range]);
				range++;
			} else if (range >= data.length){
				range = 0;
			}
		}
		const leftSet = shortData.map((item, index) => (
			{word: item.en, index}
		)).sort(function (a, b) {
			return (a.word > b.word) ? 1 : ((b.word > a.word) ? -1 : 0);
		});
		const rightSet = shortData.map((item, index) => (
			{word: item.ru, index}
		)).sort();
		this.setState({
			leftSet,
			rightSet,
			itemIndex: range,
		})
	}

	setLeftAnswer(e) {
		const value = e.target.value;
		this.setState({
			leftAnswer: value,
		}, () => {
			this.compareAnswers(value)
		})
	}

	setRightAnswer(e) {
		const value = e.target.value;
		this.setState({
			rightAnswer: value,
		}, () => {
			this.compareAnswers(value)
		})
	}

	compareAnswers(value) {
		if (this.state.leftAnswer === this.state.rightAnswer) {
			let answerValue = Object.assign([], this.state.answerValue);
			answerValue.push(value);
			this.setState({
				answerValue,
				leftAnswer: '',
				rightAnswer: '',
			});
		}
	}


	render() {
		const { playVoice, textVoice, leftSet, rightSet, leftAnswer, rightAnswer, answerValue} = this.state;

		return (
			<div>
				{playVoice &&
					<VoicePlayer
						onEnd={this.onEnd}
						play
						text={textVoice}
					/>
				}

				<h3>Match</h3>
				<button id="button-pairs" className="button-newset" type="button" onClick={this.newSetPairs}>New
					Set
				</button>

				<div className="pairs">
					<div className="leftSet">
						{leftSet.map((item, index) => (
							<button
								key={`${item.word}+${index}`}
								value={item.index}
								onClick={this.setLeftAnswer}
								disabled={answerValue.find((id) => id == item.index)}
								className={parseInt(leftAnswer) === item.index ? "active" : ""}>
								{item.word}
							</button>
						))
						}
					</div>
					<div className="rightSet">
						{rightSet.map((item, index) => (
							<button key={`${item.word}+${index}`}
									value={item.index}
									onClick={this.setRightAnswer}
									disabled={answerValue.find((id) => id == item.index)}
									className={parseInt(rightAnswer) === item.index ? "active" : ""}>
								{item.word}
							</button>
						))
						}
					</div>
				</div>
			</div>
		);
	}
}

export default Match;
