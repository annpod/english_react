import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import ListItem from './components/ListItem';
import NewItem from './components/NewItem';
import Navigation from './components/Navigation';

import {
	addWord,
	getWordList,
	updateData,
	deleteData,
	categoryList
} from '../../actions/word';

import {
	groupSelectWord,
	getListWord
} from '../../selectors';

class Words extends Component {

	constructor(props) {
		super(props);
		this.state = {
			category: "",
			multi: true,
			multiValue: [],
			value: [],
			subject: "",
		};
		this.getData = this.getData.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
	}

	componentDidMount() {
		this.getData();
	}

	async getData() {
		await this.props.getWordList();
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
		const { multi, multiValue, value } = this.state;
		const { selectSet, data, categoryList } = this.props;
		return (
			<div>
				<Navigation />				
				<div className="page-content">
					<span>
						<label>filter data</label>
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
							<NewItem
								selectSet={selectSet}
								getData={this.getData}
							/>
							{data && data.length > 0 && data.map((item, index) => (
								<ListItem
									key={`${index}3`}
									index={index}
									item={item}
									categoryList={categoryList}
									getData={this.getData}
								/>
							))}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	selectSet: groupSelectWord(state),
	data : getListWord(state),
});

const mapDispatchToProps = {
	addWord,
	getWordList,
	updateData,
	deleteData,
	getListWord,
	categoryList
};

export default connect(mapStateToProps, mapDispatchToProps)(Words);
