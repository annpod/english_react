import {
	ADD_QUESTION_START,
	ADD_QUESTION_SUCCESS,
	ADD_QUESTION_FAILURE,
	UPDATE_QUESTION_START,
	UPDATE_WORD_SUCCESS,
	UPDATE_QUESTION_FAILURE,
	DELETE_QUESTION_START,
	DELETE_QUESTION_SUCCESS,
	DELETE_QUESTION_FAILURE,
	GET_QUESTION_LIST_START,
	GET_QUESTION_LIST_SUCCESS,
	GET_QUESTION_LIST_FAILURE,
	CATEGORY_LIST_QUESTION,
	SAVE_CATEGORY_QUESTION
} from '../actions/index';

import { selectValues, arrays } from '../data/vocabulary';

import { createReducer } from './utils';

const initialState = {
	questionList: [],
	categoryList: [],
	category: ""
};

const handlers = {
	[GET_QUESTION_LIST_SUCCESS]: (state, { payload }) => {
		return { questionList: payload };
	},
};

export default createReducer(initialState, handlers);
