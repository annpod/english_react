import React, { Component } from 'react';
import { connect } from 'react-redux';
import { VoicePlayer, VoiceRecognition } from 'react-voice-components';
import Sequence from '../Components/Sequence';
import { initData } from '../../actions/vocabulary';
import { randomIntFromInterval } from '../../selectors';
import Match from "../Components/Match";

class Vocabulary extends Component {

	constructor(props) {
		super(props);
		this.state = {
			setName: "",
			data: [],
			playVoice: false,
			world: "",
			wordIndex: 0,
			worldAnswer: "",
			worldError: false,
			translation: "",
			isAnswer: false,
			isShowAnswer: false,
			textVoice: "",
		};

		this.updateSelect = this.updateSelect.bind(this);
		this.updateInput = this.updateInput.bind(this);
		this.newWorld = this.newWorld.bind(this);
		this.deleteError = this.deleteError.bind(this);
		this.onEnd = this.onEnd.bind(this);
		this.onPlay = this.onPlay.bind(this);
		this.showAnswer = this.showAnswer.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		this.props.initData();
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			setName: nextProps.selectSet[0].value,
			data: nextProps.array[nextProps.selectSet[0].value],
			world: nextProps.array[nextProps.selectSet[0].value][0].ru,
			translation: nextProps.array[nextProps.selectSet[0].value][0].en,
			wordIndex: 1,
		})
	}

	updateSelect(event) {
		const { array } = this.props;
		const { data } = this.state;
		this.setState({
			set: event.target.value,
			data: array[event.target.value],
			world: array[event.target.value][0].ru,
			translation: array[event.target.value][0].en
		});
	}

	updateInput(event) {
		this.setState({[event.target.name]: event.target.value});
	}

	newWorld() {
		const { data, wordIndex } = this.state;

		let index = wordIndex >= data.length ? 0 : wordIndex;
		this.setState({
			worldAnswer: "",
			world: data[index].ru,
			translation: data[index].en,
			isAnswer: false,
			wordIndex: index + 1,
		});
	}

	deleteError() {
		this.setState({
			worldError: false,
		})
	}

	onEnd() {
		this.setState({
				play: false,
				playVoice: false,
			}, () => {
				if (this.state.isAnswer) {
					this.newWorld()
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
		const { translation, worldAnswer } = this.state;
		if (translation === worldAnswer) {
			this.setState({
				isAnswer: true,
				isShowAnswer: false,
			}, () => {
				this.onPlay();
				this.newWorld();
			})
		} else {
			this.setState({
				worldError: true,
			})
		}
	}


	render() {
		const { playVoice, world, data, worldAnswer, worldError, translation, isShowAnswer } = this.state;
		const { selectSet } = this.props;

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
							text={translation}
						/>
					}

					<select id="language">
						<option value="ru">Native</option>
						<option value="en">English</option>
					</select>
					<div id="world">{world}</div>
					<form id="form" onSubmit={this.onSubmit}>
						<input id="answer" type="text" name="worldAnswer"
							value={worldAnswer}
							className={worldError ? "error" : ""}
							onFocus={this.deleteError}
							onChange={this.updateInput}/>
						<div className="answer-result"></div>
						<button id="button" className="button-check" type="submit"></button>
						<button id="button-next" className="button-new" type="button" onClick={this.newWorld}></button>
						<button id="button-speak" className="button-speak" type="button" onClick={this.onPlay}>Speak
						</button>
					</form>
					<button id="button-answer" className="answer" type="button" onClick={this.showAnswer}>Show Answer
					</button>
					{isShowAnswer &&
						<span id="right-answer">{translation}</span>
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
	selectSet: state.vocabulary.selectValues,
	array: state.vocabulary.arrays,
});

const mapDispatchToProps = {
	initData
};

export default connect(mapStateToProps, mapDispatchToProps)(Vocabulary);
