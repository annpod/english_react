import React, {Component} from 'react';

import {
	SortableContainer,
	SortableElement,
	arrayMove,
} from 'react-sortable-hoc';

const SortableItem = SortableElement(({value}) =>
	<li className="letter-item">{value}</li>
);

const SortableList = SortableContainer(({items}) => {
	return (
		<ul>
			{items.map((value, index) => (
				<SortableItem key={`item-${index}`} index={index} value={value}/>
			))}
		</ul>
	);
});


class SequenceDnD extends Component {

	constructor(props) {
		super(props);
		this.state = {
			iswordDnDcorrect: false,
			items: this.props.items,
		};

		this.onSortEnd = this.onSortEnd.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			iswordDnDcorrect: false,
			items: nextProps.items,
		})
	}

	onSortEnd = ({oldIndex, newIndex}) => {
		this.setState({
			items: arrayMove(this.state.items, oldIndex, newIndex),
		}, () => this.checkAnswer());
	};

	checkAnswer() {
		if ((this.state.items).join("") === this.props.wordDnD) {
			this.setState({
				iswordDnDcorrect: true,
			}, () => {
				this.props.onSortEnd(this.state.items)
			})
		}
	}


	render() {
		const { iswordDnDcorrect, items } = this.state;
		return (
			<div id='letters' className={iswordDnDcorrect ? "corret" : ""}>
				<SortableList items={items} onSortEnd={this.onSortEnd} axis="x"/>
			</div>
		);
	}
}

export default SequenceDnD;
