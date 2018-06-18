import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initData } from '../../actions/vocabulary';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt } from '@fortawesome/fontawesome-free-solid';
import {
	addWord,
	getWordList,
	updateData,
	deleteData,
} from '../../actions/vocabulary';
import { groupBy, groupSelect } from '../../selectors';

class Words extends Component {

	constructor(props) {
		super(props);
		this.state = {
			category: "",
			data: [],
			word: "",
			translation: "",
			editWord: "",
			editTranslation: "",
			isEdit: false,
			indexEdit: "",
			isNewCategory: false,
		};

		this.updateSelect = this.updateSelect.bind(this);
		this.updateInput = this.updateInput.bind(this);
		this.addWord = this.addWord.bind(this);
		this.editWord = this.editWord.bind(this);
		this.deleteWord = this.deleteWord.bind(this);
		this.saveWord = this.saveWord.bind(this);
		this.getData = this.getData.bind(this);
		this.saveEditWord = this.saveEditWord.bind(this);
		this.addCategory = this.addCategory.bind(this);
		this.showCategory = this.showCategory.bind(this);
		this.cancelEditWord = this.cancelEditWord.bind(this);

	}

	componentDidMount() {
		this.getData();
	}

	async getData() {
		await this.props.getWordList();
		const { selectSet, array } = this.props;
console.log("selectSet",selectSet);
		this.setState({
			isNewCategory: !selectSet.length,
			category: selectSet.length && selectSet[0].value || "",
			data: selectSet.length && array[selectSet[0].value] || [],
		})
	}

	updateSelect(event) {
		const { array } = this.props;
		const index = event.nativeEvent.target.selectedIndex;

		this.setState({
			category: event.target.value,
			data: array[event.target.value],
		});
	}

	updateInput(event) {
		this.setState({[event.target.name]: event.target.value});
	}

	async addWord() {
		const { word, translation, category, isNewCategory } = this.state;
		const wordVar = word.trim();
		const translationVar = translation.trim();
		const categoryVar = isNewCategory ? category.trim() : category;
		if (wordVar && translationVar && categoryVar){
			const body = {word: wordVar, translation: translationVar, category: categoryVar};
			await this.props.addWord(body);
			this.getData();
			this.setState({
				word: "",
				translation: "",
			})
		}
	}

	editWord(index){
		console.log("index", index);
		const { data } = this.state;
		this.setState({
			isEdit: true,
			id: data[index]._id,
			indexEdit: index,
			editWord: data[index].word,
			editTranslation: data[index].translation,
		})	
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
		const { id, editWord, editTranslation, category } = this.state;
		const body = {word: editWord, translation: editTranslation, category};
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

	async deleteWord(index) {
		const id = this.state.data[index]._id;
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

	showCategory() {
		const { set } = this.state;
		const { array } = this.props;
		this.setState({
			data: array[set],
			isNewCategory: false,
		});
	}


	render() {
		const { word, translation, editWord, editTranslation, category, isEdit, indexEdit, data, isNewCategory } = this.state;
		const { selectSet, array } = this.props;
		console.log("indexEdit", indexEdit);
		return (
			<div>
				{isNewCategory || !selectSet.length ?
					<span>
						<label>Category</label>
						<input name="category" className="input-category"  value={category} onChange={this.updateInput} />
						<button className="button-image button-image_back" onClick={this.showCategory}>
							<FontAwesomeIcon icon="chevron-left" />
						</button>
					</span>
					:
					<span>
						<label>Category</label>
						<select className="select-category" onChange={this.updateSelect}>
						{selectSet && selectSet.map((item, index) => (
							<option key={index} value={item.value}>{item.value}</option>
						))}
						</select>
						<button className="button-image button-image_add" onClick={this.addCategory}>
							<FontAwesomeIcon icon={faPlus} />
						</button>
					</span>
				}

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
										<button onClick={() => this.editWord(index)} className="button-image button-image_edit">
											<FontAwesomeIcon icon={faPencilAlt} />
										</button>
										<button onClick={() => this.deleteWord(index)} className="button-image button-image_delete">
											<FontAwesomeIcon icon="trash-alt" />
										</button>
									</span>
								}

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
	deleteData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Words);
