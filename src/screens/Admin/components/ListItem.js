import React, { Component } from 'react';
import { connect } from "react-redux";
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Select from 'react-select';
import { faPlus, faPencilAlt } from '@fortawesome/fontawesome-free-solid';
import Button from '../../Components/Button';
import {
	updateData,
	deleteData,
} from '../../../actions/word';

import { categoryList } from '../../../selectors';

class ListItem extends Component {

	constructor(props) {
		super(props);
		this.state = {
			editWord: "",
			editTranslation: "",
			isEdit: false,
			multi: true,
			value: []
		};

		this.state.multiValue = categoryList(props.item.category);

		this.updateInput = this.updateInput.bind(this);
		this.editWord = this.editWord.bind(this);
		this.deleteWord = this.deleteWord.bind(this);
		this.saveEditWord = this.saveEditWord.bind(this);
		this.cancelEditWord = this.cancelEditWord.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);

	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			multiValue: categoryList(nextProps.item.category)
		})
	}

	updateInput(event) {
		this.setState({[event.target.name]: event.target.value});
	}

	editWord(){
		const { item } = this.props;
		const options =[];
		item.category.forEach((item) => {options.push({ value: item, label: item })});
		this.handleOnChange(options);
		this.setState({
			isEdit: true,
			id: item._id,
			editWord: item.word,
			editTranslation: item.translation,
			multiValue: options,
		});
	}

	cancelEditWord(){
		this.setState({
			isEdit: false,
			id: "",
			indexEdit: "",
			editWord: "",
			editTranslation: "",
		})
	}

	async saveEditWord() {
		const { editWord, editTranslation, multiValue } = this.state;
		const { item } = this.props;
		let categoryVar = multiValue;
		const categoryArray = [];
		for (let category of categoryVar) {
			categoryArray.push(category.value);
		}
		const wordVar = editWord.trim();
		const translationVar = editTranslation.trim();
		if (wordVar && translationVar && categoryArray.length) {
			const body = {word: editWord, translation: editTranslation, category: categoryArray};
			this.setState({
				isEdit: false,
				id: "",
				indexEdit: "",
				editWord: "",
				editTranslation: "",
			});
			await this.props.updateData(item._id, body);
			this.props.getData();
		}
	}

	async deleteWord() {
		await this.props.deleteData(this.props.item._id);
		this.props.getData();
	}

	handleOnChange (value) {
		const { multi } = this.state;
		if (multi) {
			this.setState({ multiValue: value });
		} else {
			this.setState({ value });
		}
	}

	render() {
		const { editWord, editTranslation, isEdit, multi, multiValue, value } = this.state;
		const { item, selectSet, index } = this.props;
		console.log("multiValue",multiValue);
		return (
			<tr key={`${index}1`}>
				<td>
					<Select.Creatable
						disabled={!isEdit}
						multi={multi}
						options={selectSet}
						onChange={this.handleOnChange}
						value={multi ? multiValue : value}
					/>
				</td>
				<td>
					{isEdit ?
						<input className="input-edit"  name="editWord" value={editWord} onChange={this.updateInput}/>
						:
						<div className="table-text">{item.word}</div>
					}
					</td>
					<td key={`${index}2`}>
						{isEdit ?
							<input className="input-edit" name="editTranslation" value={editTranslation} onChange={this.updateInput}/>
							:
							<div className="table-text">{item.translation}</div>
						}
						</td>
					<td>
					
					<span>
						<Button
							type='icon'
							icon={isEdit ? 'save' : 'edit'}
							value={isEdit ? 'save' : 'edit'}
							onClick={isEdit ? this.saveEditWord : this.editWord}
						/>
						<Button
							type='icon'
							icon={isEdit ? 'ban' : 'trash-alt'}
							value='cancel'
							onClick={isEdit ? this.cancelEditWord : this.deleteWord}
						/>
					</span>	
				</td>
			</tr>
		)
	}
}

const mapStateToProps = () => ({

});

const mapDispatchToProps = {
	updateData,
	deleteData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);