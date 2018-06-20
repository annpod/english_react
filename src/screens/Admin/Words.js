import React, { Component } from 'react';
import { connect } from 'react-redux';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt } from '@fortawesome/fontawesome-free-solid';
import createClass from 'create-react-class';
import Select from 'react-select';
import ListItem from './components/ListItem';
import NewItem from './components/NewItem';

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
			multi: true,
			multiValue: [],
			value: []
		};
		this.getData = this.getData.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);

	}

	componentDidMount() {
		this.getData();
	}

	async getData() {
		console.log("get data");
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
		console.log("data", data);
		return (
			<div>
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
		);
	}
}

const mapStateToProps = (state) => ({
	selectSet: groupSelect(state),
	data : getList(state),
});

const mapDispatchToProps = {
	addWord,
	getWordList,
	updateData,
	deleteData,
	getList,
	categoryList
};

export default connect(mapStateToProps, mapDispatchToProps)(Words);
