import React, { Component } from 'react';
import { connect } from 'react-redux';
import { VoicePlayer, VoiceRecognition } from 'react-voice-components';
import { initData } from '../../actions/vocabulary';
import { randomIntFromInterval } from '../../selectors';
import {
  SortableContainer,
  SortableElement,
  arrayMove,
  useDragHandle,
 } from 'react-sortable-hoc';

const SortableItem = SortableElement(({value}) =>
  <li className="letter-item">{value}</li>
);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  );
});


class Vocabulary extends Component {

	constructor(props) {
		super(props);
		this.state = {
			setName: "",
			data: [],
			playVoice: false,
			world: "",
			worldAnswer: "",
			translation: "",
			isAnswer: false,
			isShowAnswer: false,
			wordDnD: "",
			wordDnDItems: [],
      iswordDnDcorrect: false,
      textVoice: "",
      leftSet: [],
      rightSet: [],
      leftAnswer: "",
      rightAnswer: "",
		};

		this.updateSelect = this.updateSelect.bind(this);
		this.updateInput = this.updateInput.bind(this);
		this.newWorld = this.newWorld.bind(this);
		this.onEnd = this.onEnd.bind(this);
		this.onPlay = this.onPlay.bind(this);
		this.showAnswer = this.showAnswer.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.newSetPairs = this.newSetPairs.bind(this);
		this.onSortEnd = this.onSortEnd.bind(this);
		this.newWorldDnD = this.newWorldDnD.bind(this);
		this.checkAnswer = this.checkAnswer.bind(this);
    this.setLeftAnswer = this.setLeftAnswer.bind(this);
    this.setRightAnswer = this.setRightAnswer.bind(this);
    this.compareAnswers = this.compareAnswers.bind(this);
	}

	componentDidMount(){
		this.props.initData();
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			setName: nextProps.selectSet[0].value,
			data: nextProps.array[nextProps.selectSet[0].value],
			world: nextProps.array[nextProps.selectSet[0].value][0].ru,
			translation: nextProps.array[nextProps.selectSet[0].value][0].en
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
		this.setState({ [event.target.name]: event.target.value });
	}
	newWorld() {
		const { worldAnswer, data } = this.state;
		let length = data.length - 1;
		let random = randomIntFromInterval(0,length);
		this.setState({
			worldAnswer: "",
			world: data[random].ru,
			translation: data[random].en,
			isAnswer: false,
		});
	}

	onEnd() {
		this.setState({
			play: false,
			playVoice: false,
			},() => {
				if (this.state.isAnswer) {this.newWorld()}}
		);
	}

	onPlay(textVoice) {
		this.setState({
			playVoice: true,
			play: true,
      textVoice,
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
		if(translation === worldAnswer) {
			this.setState({
				isAnswer: true,
				isShowAnswer: false,
			},() => {this.onPlay(translation)})
		}
	}

	newSetPairs() {
		const { data } = this.state;
    const leftSet = data.map((item, index) => (
      {word: item.en, index}
    )).sort(function(a,b) {return (a.word > b.word) ? 1 : ((b.word > a.word) ? -1 : 0);});
    const rightSet = data.map((item, index) => (
      {word: item.ru, index}
    )).sort();
		this.setState({
			leftSet,
      rightSet
		})
	}

	newWorldDnD() {
		const { data } = this.state;
    let length = data.length - 1;
			let random = randomIntFromInterval(0,length);
			this.setState({
				wordDnD: data[random].en,
				wordDnDItems: data[random].en.split('').sort(),
			})
	}

	onSortEnd = ({oldIndex, newIndex}) => {
     this.setState({
       wordDnDItems: arrayMove(this.state.wordDnDItems, oldIndex, newIndex),
     },() => this.checkAnswer());
   };

	checkAnswer() {
    if ((this.state.wordDnDItems).join("") === this.state.wordDnD) {
      this.setState({
        iswordDnDcorrect: true,
      },() => {this.onPlay(this.state.wordDnD)})
    }
	}

  setLeftAnswer(e) {
    this.setState({leftAnswer: e.target.value}, () => {this.compareAnswers()})
  }
  setRightAnswer(e) {
    this.setState({rightAnswer: e.target.value}, () => {this.compareAnswers()})
  }
  compareAnswers() {
      if(this.state.leftAnswer === this.state.rightAnswer) {
        console.log("!!!");
      }
  }


	render() {
		const { set, playVoice, world, data, worldAnswer, textVoice, translation, isShowAnswer, pairs, wordDnDItems, iswordDnDcorrect, leftSet, rightSet } = this.state;
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
							text={textVoice}
						/>
					}

					<select  id="language">
						<option value="ru">Native</option>
						<option value="en">English</option>
					</select>
					<div id="world">{world}</div>
					<form id="form" onSubmit={this.onSubmit}>
						<input id="answer" type="text" name="worldAnswer" value={worldAnswer} onChange={this.updateInput}/>
						<div className="answer-result"></div>
						<button id="button" className="button-check" type="submit"></button>
						<button id="button-next" className="button-new" type="button" onClick={this.newWorld}></button>
						<button id="button-speak" className="button-speak" type="button" onClick={this.onPlay}>Speak</button>
					</form>
					<button id="button-answer" className="answer" type="button" onClick={this.showAnswer}>Show Answer</button>
					{isShowAnswer &&
						<span id="right-answer">{translation}</span>
					}

				<h3>Make up the word</h3>
				<button id="button-letters" className="button-newset" type="button" onClick={this.newWorldDnD}>New word</button>
				<button id="button-speak-letters" className="button-speak" type="button">Speak</button>
				<div id='letters' className={iswordDnDcorrect ? "corret" : ""}>
					<SortableList items={wordDnDItems} onSortEnd={this.onSortEnd} axis="x" />
				</div>
				<h3>Match</h3>
				<button id="button-pairs" className="button-newset" type="button" onClick={this.newSetPairs}>New Set</button>

				<div className="pairs">
          <div className="leftSet">
            {leftSet.map((item, index) => (
                <button key={`${item.word}+${index}`} value={item.index} onClick={this.setLeftAnswer}>{item.word}</button>
              ))
            }
            </div>
            <div className="rightSet">
              {rightSet.map((item, index) => (
                  <button key={`${item.word}+${index}`} value={item.index} onClick={this.setRightAnswer}>{item.word}</button>
                ))
              }
              </div>
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
