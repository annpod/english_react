import React, { Component } from 'react';
import { connect } from 'react-redux';
import { VoicePlayer, VoiceRecognition } from 'react-voice-components';
import Sequence from '../Components/Sequence';
import { initData } from '../../actions/word';
import { randomIntFromInterval } from '../../selectors';
import Match from "../Components/Match";

import {
	getWordList,
	saveCategory
} from '../../actions/word';

import {
	groupBy,
	groupSelect,
	groupByCategory
} from '../../selectors';

class Vocabulary extends Component {

	constructor(props) {
		super(props);
		this.state = {
			setName: "",
			data: [],
			playVoice: false,
			word: "",
			wordIndex: 0,
			wordAnswer: "",
			wordError: false,
			translation: "",
			isAnswer: false,
			isShowAnswer: false,
			textVoice: "",
		};

		this.updateSelect = this.updateSelect.bind(this);
		this.updateInput = this.updateInput.bind(this);
		this.newWord = this.newWord.bind(this);
		this.deleteError = this.deleteError.bind(this);
		this.onEnd = this.onEnd.bind(this);
		this.onPlay = this.onPlay.bind(this);
		this.showAnswer = this.showAnswer.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	async componentDidMount() {
		await this.props.getWordList();
		this.props.saveCategory(this.props.selectSet[0].value);

	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.data.length) {
			this.setState({
				setName: nextProps.selectSet[0].value,
				word: nextProps.data[0].word ,
				translation: nextProps.data[0].translation,
				wordIndex: 1,
			})
		}
	}

	async updateSelect(event) {
		await this.props.saveCategory(event.target.value);
	}

	updateInput(event) {
		this.setState({[event.target.name]: event.target.value});
	}

	newWord() {
		const { wordIndex } = this.state;
		const { data } = this.props;
		let index = wordIndex >= data.length ? 0 : wordIndex;
		this.setState({
			wordAnswer: "",
			word: data[index].word,
			translation: data[index].translation,
			isAnswer: false,
			wordIndex: index + 1,
		});
	}

	deleteError() {
		this.setState({
			wordError: false,
		})
	}

	onEnd() {
		this.setState({
				play: false,
				playVoice: false,
			}, () => {
				if (this.state.isAnswer) {
					this.newWord()
				}
			}
		);
	}

	onPlay() {
		this.setState({
			playVoice: true,
			play: true,
		})
	}

	showAnswer() {
		this.setState({
			isShowAnswer: true,
		});
	}

	onSubmit(e) {
		e.preventDefault();

		const { word, wordAnswer } = this.state;
		console.log("word, wordAnswer", word, wordAnswer);
		if (word === wordAnswer) {
			this.setState({
				isAnswer: true,
				isShowAnswer: false,
			}, () => {
				this.onPlay();
				this.newWord();
			})
		} else {
			this.setState({
				wordError: true,
			})
		}
	}


	render() {
		const { playVoice, word, wordAnswer, wordError, translation, isShowAnswer } = this.state;
		const { selectSet, data } = this.props;
console.log("data", data);
		return (
			<div className="page-content">
				<button id="button-sound" className="button-sound" type="button"></button>
				<div id="Words">
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
							text={word}
						/>
					}

					<div id="word">{translation}</div>
					<form id="form" onSubmit={this.onSubmit}>
						<input id="answer" type="text" name="wordAnswer"
							value={wordAnswer}
							className={wordError ? "error" : ""}
							onFocus={this.deleteError}
							onChange={this.updateInput}/>
						<div className="answer-result"></div>
						<button id="button" className="button-check" type="submit"></button>
						<button id="button-next" className="button-new" type="button" onClick={this.newWord}></button>
						<button id="button-speak" className="button-speak" type="button" onClick={this.onPlay}>Speak
						</button>
					</form>
					<button id="button-answer" className="answer" type="button" onClick={this.showAnswer}>Show Answer
					</button>
					{isShowAnswer &&
						<span id="right-answer">{word}</span>
					}

					<h3>Make up the word</h3>
					<Sequence data={data} />

					<Match data={data}/>

				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	selectSet: groupSelect(state),
	data: groupByCategory(state),
});

const mapDispatchToProps = {
	initData,
	getWordList,
	groupBy,
	saveCategory,
	groupByCategory
};

export default connect(mapStateToProps, mapDispatchToProps)(Vocabulary);
