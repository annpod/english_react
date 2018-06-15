export const randomIntFromInterval = function(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
};

export const sortArrayofObj = function (a,b) {
  if (a.last_nom < b.last_nom)
    return -1;
  if (a.last_nom > b.last_nom)
    return 1;
  return 0;
};

export const groupBy = (state) => {
	const currentProps = state.vocabulary.vocabulary;
	return currentProps.reduce((groups, item) => {
		const val = item['set'];
		groups[val] = groups[val] || [];
		groups[val].push(item);
		return groups;
	}, {})
};

export const groupSelect = (state) => {
	const currentProps = groupBy(state);
	let value = [];
	Object.keys(currentProps).forEach(key => {
		value.push({value: key, label: currentProps[key][0].setTitle})
	});
	console.log("value", value);
	return value;
};
