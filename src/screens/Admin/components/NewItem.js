import React, { Component } from 'react';
import { connect } from 'react-redux';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Select from 'react-select';

import {
	addWord,
	categoryList,
} from '../../../actions/word';

class NewItem extends Component {

	constructor(props) {
		super(props);
		this.state = {
			category: "",
			word: "",
			translation: "",
			multi: true,
			multiValue: [],
			value: []
		};

		this.updateInput = this.updateInput.bind(this);
		this.addWord = this.addWord.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);

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
			this.props.getData();
			this.setState({
				word: "",
				translation: "",
			})
		}
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
		const { word, translation, multi, multiValue, value } = this.state;
		const { selectSet, categoryList } = this.props;
		return (
					<tr>
						<td>
							<Select.Creatable
								multi={multi}
								options={selectSet}
								onChange={this.handleOnChange}
								value={multi ? multiValue : value}
							/>
						</td>
						<td><input className="input-edit" name="word" value={word} onChange={this.updateInput}/></td>
						<td><input className="input-edit" name="translation" value={translation} onChange={this.updateInput}/></td>
						<td>
							<button className="button-image button-image_save" onClick={this.addWord}>
								<FontAwesomeIcon icon="save" />
							</button>
						</td>
					</tr>
		);
	}
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = {
	addWord,
	categoryList
};

export default connect(mapStateToProps, mapDispatchToProps)(NewItem);
