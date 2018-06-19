import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initData } from '../../actions/vocabulary';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt } from '@fortawesome/fontawesome-free-solid';
import createClass from 'create-react-class';
import Select from 'react-select';
//import ListItem from './components/ListItem';

import {
	addWord,
	getWordList,
	updateData,
	deleteData,
	categoryList,
} from '../../actions/vocabulary';

import {
	groupSelect,
	filterData,
	getList
} from '../../selectors';

class Words extends Component {

	constructor(props) {
		super(props);
		this.state = {
			category: "",
			word: "",
			translation: "",
			editWord: "",
			editTranslation: "",
			isEdit: false,
			indexEdit: "",
			multi: true,
			multiValue: [],
			value: []
		};

		this.updateInput = this.updateInput.bind(this);
		this.addWord = this.addWord.bind(this);
		this.editWord = this.editWord.bind(this);
		this.deleteWord = this.deleteWord.bind(this);
		this.saveWord = this.saveWord.bind(this);
		this.getData = this.getData.bind(this);
		this.saveEditWord = this.saveEditWord.bind(this);
		this.addCategory = this.addCategory.bind(this);
		this.cancelEditWord = this.cancelEditWord.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);

	}

	componentDidMount() {
		this.getData();
	}

	async getData() {
		await this.props.getWordList();
	}

	updateInput(event) {
		this.setState({[event.target.name]: event.target.value});
	}

	async addWord() {
		const { word, translation, multi, multiValue, value } = this.state;
		let categoryVar = multi ? multiValue : value;
		const categoryArray = [];
		for (let category of categoryVar) {
			categoryArray.push(category.value);
		}
		const wordVar = word.trim();
		const translationVar = translation.trim();
		if (wordVar && translationVar && categoryArray.length){
			const body = {word: wordVar, translation: translationVar, category: categoryArray};
			await this.props.addWord(body);
			this.getData();
			this.setState({
				word: "",
				translation: "",
			})
		}
	}

	editWord(index){
		const { data } = this.props;
		const options =[];
		data[index].category.forEach((item) => {options.push({ value: item, label: item })});
		this.handleOnChange(options);
		this.setState({
			isEdit: true,
			id: data[index]._id,
			indexEdit: index,
			editWord: data[index].word,
			editTranslation: data[index].translation,
			multiValue: options,
		});
	}

	cancelEditWord(index){
		this.setState({
			isEdit: false,
			id: "",
			indexEdit: "",
			editWord: "",
			editTranslation: "",
		})
	}

	async saveEditWord() {
		const { id, editWord, editTranslation, multiValue } = this.state;
		let categoryVar = multiValue;
		const categoryArray = [];
		for (let category of categoryVar) {
			categoryArray.push(category.value);
		}
		const wordVar = editWord.trim();
		const translationVar = editTranslation.trim();
		if (wordVar && translationVar && categoryArray.length) {
			const body = {word: editWord, translation: editTranslation, category: categoryArray};
			await this.props.updateData(id, body);
			this.getData();
			this.setState({
				isEdit: false,
				id: "",
				indexEdit: "",
				editWord: "",
				editTranslation: "",
			})
		}
	}

	async deleteWord(index) {
		const id = this.props.data[index]._id;
		await this.props.deleteData(id);
		this.getData();
	}

	saveWord() {
		this.setState({
			isEdit: false,
			indexEdit: "",
			editWord: "",
			editTranslation: "",
		})
	}

	addCategory() {
		this.setState({
			data: [],
			isNewCategory: true,
		});
	}

	handleOnChange (value) {
		const { multi } = this.state;
		if (multi) {
			this.setState({ multiValue: value });
		} else {
			this.setState({ value });
		}
		const categoryArray = [];
		for (let category of value) {
			categoryArray.push(category.value);
		}
		this.props.categoryList(categoryArray);
	}


	render() {
		const { word, translation, editWord, editTranslation, isEdit, indexEdit, multi, multiValue, value } = this.state;
		const { selectSet, data } = this.props;
		console.log("data", data);
		return (
			<div>
				<span>
					<label>Category</label>
					<Select.Creatable
						multi={multi}
						options={selectSet}
						onChange={this.handleOnChange}
						value={multi ? multiValue : value}
					/>
				</span>

				<table className="table-vocabulary">
					<thead>
						<tr>
							<th>Word</th>
							<th>Translation</th>
						</tr>
					</thead>
					<tbody>
					<tr>
						<td><input className="input-edit" name="word" value={word} onChange={this.updateInput}/></td>
						<td><input className="input-edit" name="translation" value={translation} onChange={this.updateInput}/></td>
						<td>
							<button className="button-image button-image_save" onClick={this.addWord}>
								<FontAwesomeIcon icon="save" />
							</button>
						</td>
					</tr>
					{data && data.length > 0 && data.map((item, index) => (
						<div>
						{/*
						<ListItem 
							item={item}
							updateInput={this.updateInput}
							cancelEditWord={this.cancelEditWord}
							editWord={this.editWord}
							deleteWord={this.deleteWord}

						/>
*/}

						<tr key={`${index}0`}>
							<td key={`${index}1`}>
								{isEdit && index === indexEdit ?
									<input className="input-edit"  name="editWord" value={editWord} onChange={this.updateInput}/>
									:
									<div className="table-text">{item.word}</div>
								}
								</td>
								<td key={`${index}2`}>
									{isEdit && index === indexEdit ?
										<input className="input-edit"  name="editTranslation" value={editTranslation} onChange={this.updateInput}/>
										:
										<div className="table-text">{item.translation}</div>
									}
									</td>
								<td>
								{isEdit && index === indexEdit ?
									<span>
										<button className="button-image button-image_save" onClick={this.saveEditWord}>
											<FontAwesomeIcon icon="save" />
										</button>
										<button className="button-image button-image_cancel" onClick={() => this.cancelEditWord(index)}>
											<FontAwesomeIcon icon="ban" />
										</button>
									</span>
									:
									<span>
										<button onClick={() => this.editWord
											(index)} className="button-image button-image_edit">
											<FontAwesomeIcon icon={faPencilAlt} />
										</button>
										<button onClick={() => this.deleteWord(index)} className="button-image button-image_delete">
											<FontAwesomeIcon icon="trash-alt" />
										</button>
									</span>
								}

							</td>
						</tr>
						</div>
					))}
					</tbody>
				</table>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	selectSet: groupSelect(state),
	data : getList(state),
});

const mapDispatchToProps = {
	initData,
	addWord,
	getWordList,
	updateData,
	deleteData,
	getList,
	categoryList
};

export default connect(mapStateToProps, mapDispatchToProps)(Words);
