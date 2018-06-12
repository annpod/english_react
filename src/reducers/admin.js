import {
	INIT_DATA,
	ADD_WORD_START,
	ADD_WORD_SUCCESS,
	ADD_WORD_FAILURE,
	UPDATE_WORD_START,
	UPDATE_WORD_SUCCESS,
	UPDATE_WORD_FAILURE,
	DELETE_WORD_START,
	DELETE_WORD_SUCCESS,
	DELETE_WORD_FAILURE,
	GET_WORD_LIST_START,
	GET_WORD_LIST_SUCCESS,
	GET_WORD_LIST_FAILURE,
} from '../actions/index';

import { selectValues, arrays } from '../data/vocabulary';

import { createReducer } from './utils';

const initialState = {
	vocabulary: [],
};

const handlers = {
	[GET_WORD_LIST_SUCCESS]: (state, { payload }) => {
		return { vocabulary: payload };
	}
};

export default createReducer(initialState, handlers);




/*
const addWord = (state = { selectValues: [], arrays: {}}, action) => {
	switch (action.type) {
		case INIT_DATA:
			return {...state, selectValues: selectValues, arrays: arrays};
		default:
			return state;
	}
};
const getWordList = (state = { selectValues: [], arrays: {}}, action) => {
	switch (action.type) {
		case INIT_DATA:
			return {...state, selectValues: selectValues, arrays: arrays};
		default:
			return state;
	}
};

export default addWord;
*/