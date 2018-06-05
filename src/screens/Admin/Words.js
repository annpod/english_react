import React, { Component } from 'react';
import { connect } from 'react-redux';
import { randomIntFromInterval } from '../../selectors';

class Words extends Component {

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
		this.addWorld = this.newWorld.bind(this);
		this.deleteWord = this.deleteError.bind(this);
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

	addWorld() {
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

	deleteWorld() {
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

export default connect(mapStateToProps, mapDispatchToProps)(Words);
