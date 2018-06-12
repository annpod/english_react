import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initData } from '../../actions/vocabulary';
import { addWord, getWordList, updateData } from '../../actions/vocabulary';
import { groupBy, groupSelect } from '../../selectors';

class Words extends Component {

	constructor(props) {
		super(props);
		this.state = {
			setTitle: "",
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
		this.getData = this.getData.bind(this);
		this.saveEditWord = this.saveEditWord.bind(this);
	}

	componentDidMount() {
		this.getData();
	}

	async getData() {
		await this.props.getWordList();
		const { selectSet, array } = this.props;
		this.setState({
			set: selectSet[0].value,
			setTitle: selectSet[0].label,
			data: array[selectSet[0].value],
		})
	}

	updateSelect(event) {
		const { array } = this.props;
		var index = event.nativeEvent.target.selectedIndex;

		this.setState({
			set: event.target.value,
			setTitle: event.nativeEvent.target[index].text,
			data: array[event.target.value],
		});
	}

	updateInput(event) {
		this.setState({[event.target.name]: event.target.value});
	}

	async addWord() {
		const { en, ru, set, setTitle } = this.state;
		console.log("1111",en, ru, set, setTitle);
		const body = {en, ru, set, setTitle};
		await this.props.addWord(body);
		this.getData();
		this.setState({
			en: "",
			ru: "",
		})
	}

	editWord(index){
		const { array } = this.props;
		const { setTitle, set, data } = this.state;
		console.log("edit", data[index].en);
		this.setState({
			isEdit: true,
			id: data[index]._id,
			indexEdit: index,
			editEn: data[index].en,
			editRu: data[index].ru,
		})	
	}

	async saveEditWord() {
		const { id, editEn, editRu, setTitle, set } = this.state;
		const body = {en: editEn, ru: editRu, set, setTitle};
		await this.props.updateData(id, body);
		this.getData();
		this.setState({
			isEdit: false,
			id: "",
			indexEdit: "",
			editEn: "",
			editRu: "",
		})
	}

	deleteWord() {
		console.log("delete");
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
		console.log(this.props.array);
		console.log(this.props.selectSet);
		const { en, ru, editEn, editRu, setTitle, isEdit, indexEdit, data } = this.state;
		const { selectSet, array } = this.props;
		console.log("data", array[setTitle]);
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
					{data.map((item, index) => (
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
									<button className="button-image button-image_save" onClick={this.saveEditWord}>Save</button>
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
	selectSet: groupSelect(state),
	array: groupBy(state),
});

const mapDispatchToProps = {
	initData,
	addWord,
	getWordList,
	updateData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Words);
