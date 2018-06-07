import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initData } from '../../actions/vocabulary';

class Words extends Component {

	constructor(props) {
		super(props);
		this.state = {
			setName: "",
			data: [],
			en: "",
			ru: "",
			editEn: "",
			editRu: "",
			isEdit: false,
			indexEdit: "",
		};

		this.updateSelect = this.updateSelect.bind(this);
		this.updateInput = this.updateInput.bind(this);
		this.addWord = this.addWord.bind(this);
		this.editWord = this.editWord.bind(this);
		this.deleteWord = this.deleteWord.bind(this);
		this.saveWord = this.saveWord.bind(this);
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
		this.setState({
			setName: event.target.value,
			data: array[event.target.value],
			world: array[event.target.value][0].ru,
			translation: array[event.target.value][0].en
		});
	}

	updateInput(event) {
		this.setState({[event.target.name]: event.target.value});
	}

	addWord() {
		const { en, ru, setName } = this.state;
		console.log("1111",en, ru, setName);
	}

	editWord(index){

		const { array } = this.props;
		const { setName } = this.state;
		console.log("edit", array[setName][index].en);
		this.setState({
			isEdit: true,
			indexEdit: index,
			editEn: array[setName][index].en,
			editRu: array[setName][index].ru,
		})
	}

	deleteWord() {

	}

	saveWord() {
		this.setState({
			isEdit: false,
			indexEdit: "",
			editEn: "",
			editRu: "",
		})
	}

	render() {
		const { en, ru, editEn, editRu, setName, isEdit, indexEdit } = this.state;
		const { selectSet, array } = this.props;
		console.log("data", array[setName]);
		return (
			<div>
				<select onChange={this.updateSelect}>
					{selectSet && selectSet.map((item, index) => (
						<option key={index} value={item.value}>{item.label}</option>
					))}
				</select>
				<table>
					<thead>
						<tr>
							<th>English</th>
							<th>Native</th>
						</tr>
					</thead>
					<tbody>
					<tr>
						<td><input name="en" value={en} onChange={this.updateInput}/></td>
						<td><input name="ru" value={ru} onChange={this.updateInput}/></td>
						<td>
							<button className="button-image button-image_save" onClick={this.addWord}>Save</button>
						</td>
					</tr>
					{array[setName] && array[setName].map((item, index) => (
						<tr key={`${index}0`}>
							<td key={`${index}1`}>
								{isEdit && index === indexEdit ?
									<input name="editEn" value={editEn} onChange={this.updateInput}/>
									:
									<span>{item.en}</span>
								}
								</td>
							<td key={`${index}2`}>
								{isEdit && index === indexEdit ?
									<input name="editRu" value={editRu} onChange={this.updateInput}/>
									:
									<span>{item.ru}</span>
								}
								</td>
							<td>
								{isEdit && index === indexEdit ?
									<button className="button-image button-image_save" onClick={this.saveWord}>Save</button>
									:
									<button onClick={() => this.editWord(index)}
											className="button-image button-image_edit">Edit</button>
								}
								<button className="button-image button-image_delete">Delete</button>
							</td>
						</tr>
					))}
					</tbody>
				</table>
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
