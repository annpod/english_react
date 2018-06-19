import React, {Component} from 'react';
import {VoicePlayer} from 'react-voice-components';
import SequenceDnD from './SequenceDnD';
import {randomIntFromInterval} from '../../selectors';

class Sequence extends Component {

	constructor(props) {
		super(props);
		this.state = {
			playVoice: false,
			wordDnD: "",
			wordDnDItems: [],
			itemIndex: 0,
		};

		this.onEnd = this.onEnd.bind(this);
		this.onPlay = this.onPlay.bind(this);
		this.onSortEnd = this.onSortEnd.bind(this);
		this.newWorldDnD = this.newWorldDnD.bind(this);
	}

	onEnd() {
		this.setState({
			play: false,
			playVoice: false,
		});
	}

	onPlay() {
		this.setState({
			playVoice: true,
			play: true,
		})
	}

	newWorldDnD() {
		const { data } = this.props;
		const { itemIndex } = this.state;
		let index = itemIndex >= data.length ? 0 : itemIndex;
		this.setState({
			itemIndex: index + 1,
			wordDnD: data[index].word,
			wordDnDItems: data[index].word.split('').sort(),
		})
	}

	onSortEnd(items) {
		console.log(items);
		this.setState({
		wordDnDItems: items,
		},()=>{
			this.onPlay();
			setTimeout(() => this.newWorldDnD(), 1000);
		})
	}

	render() {
		const { playVoice, wordDnD, wordDnDItems } = this.state;

		return (
			<div>
				{playVoice &&
					<VoicePlayer
						onEnd={this.onEnd}
						play
						text={wordDnD}
					/>
				}

				<button id="button-letters" className="button-newset" type="button" onClick={this.newWorldDnD}>New word
				</button>
				<button id="button-speak-letters" className="button-speak" type="button" onClick={this.onPlay}>Speak</button>

				<SequenceDnD items={wordDnDItems} wordDnD={wordDnD} onSortEnd={this.onSortEnd}/>

			</div>
		);
	}
}

export default Sequence;
