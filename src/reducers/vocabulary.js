import {INIT_DATA} from '../actions/index';
import { selectValues, arrays } from '../data/vocabulary';

const vocabulary = (state = { selectValues: [], arrays: {}}, action) => {
	switch (action.type) {
		case INIT_DATA:
			return {...state, selectValues: selectValues, arrays: arrays};
		default:
			return state;
	}
};
 
export default vocabulary;