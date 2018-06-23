// import {INIT_DATA} from '../actions/index';
// import { selectValues, arrays } from '../data/vocabulary';
//
// const vocabulary = (state = { selectValues: [], arrays: {}}, action) => {
// 	switch (action.type) {
// 		case INIT_DATA:
// 			return {...state, selectValues: selectValues, arrays: arrays};
// 		default:
// 			return state;
// 	}
// };
//
// export default vocabulary;

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
	CATEGORY_LIST,
	SAVE_CATEGORY,
} from '../actions/index';

import { selectValues, arrays } from '../data/vocabulary';

import { createReducer } from './utils';

const initialState = {
	wordList: [],
	categoryList: [],
	category: ""
};

const handlers = {
	[GET_WORD_LIST_SUCCESS]: (state, { payload }) => {
		return { wordList: payload };
	},
	[CATEGORY_LIST]: (state, { payload }) => {
		return { categoryList: payload };
	},
	[SAVE_CATEGORY]: (state, { payload }) => {
		return { category: payload };
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