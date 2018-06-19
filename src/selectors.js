export const randomIntFromInterval = function(min,max){
	return Math.floor(Math.random()*(max-min+1)+min);
};

export const groupByCategory = (state) => {
	const currentProps = state.vocabulary.wordList;
	const category = state.vocabulary.category;
	const wordList = groupByProp(currentProps);
	 return category ? wordList[category] : [];
};

export const groupBy = (state) => {
	const currentProps = state.vocabulary.wordList;
	return groupByProp(currentProps);
};


export const groupByProp = (currentProps) => {
	return currentProps.reduce((groups, item) => {
		const val = item['category'];
		if (Array.isArray(val)) {
			val.map((elem) =>{
				groups[elem] = groups[elem] || [];
				groups[elem].push(item);
			})
		} else {
			groups[val] = groups[val] || [];
			groups[val].push(item);
		}
		return groups;
	}, {})
};


export const groupSelect = (state) => {
	const currentProps = groupBy(state);
	let value = [];
	Object.keys(currentProps).forEach(key => {
		value.push({value: key, label: key})
	});
	return value;
};

export const findItems = (data, keys) => {
	let output = [];
	data.forEach((item) => {
		Object.keys(item).forEach(key => {
			if (key === 'category' && keys.every(elem => item[key].indexOf(elem) > -1)) {
				output.push(item)
			}
		});
	});
	return output;
};

export const filterData = (data, keys) => {
	let output = [];
	if (!keys.length) {
		return data;
	}
	else if (keys.length > 1) {
		output = findItems(data, keys);
	}
	else if (keys.length === 1) {
		const currentProps = groupByProp(data);
		output = currentProps[keys[0]]
	}

	return output;
};

export const getList = (state) => {
	const data = state.vocabulary.wordList;
	const keys = state.vocabulary.categoryList;
	return filterData(data, keys);
};