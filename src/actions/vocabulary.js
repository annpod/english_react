import {INIT_DATA} from '../actions/index';

export const initData = () => {
	return { type: INIT_DATA };
};
export const getMainRecipe = (active) => {
	return { type: GET_MAIN_RECIPE, payload: active };
};
export const saveFilter = (filter) => {
	return { type: SAVE_FILTER, payload: filter };
};
export const deleteItem = (item) => {
	return { type: DELETE_ITEM, payload: item };
};
export const addItem = (item) => {
	return { type: ADD_ITEM, payload: item };
};


