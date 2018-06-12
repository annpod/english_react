import {
	addWord as addWordApi,
	getWordList as getWordListApi
} from '../api/api';

import {
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
} from './index';


export const addWord = (body) => async (dispatch) => {
	console.log("addWord", body);
	dispatch({ type: ADD_WORD_START });
	try {
		const wordList = await addWordApi(body);
		dispatch({
			type: ADD_WORD_SUCCESS,
			payload: wordList,
		});
	} catch (err) {
		dispatch({
			type: ADD_WORD_FAILURE,
			payload: err,
			error: true,
		});
	}
};

export const getWordList = () => async (dispatch) => {
	console.log("getWoldList");
	dispatch({ type: GET_WORD_LIST_START });
	try {
		const wordList = await getWordListApi();
		dispatch({
			type: GET_WORD_LIST_SUCCESS,
			payload: wordList,
		});
	} catch (err) {
		dispatch({
			type: GET_WORD_LIST_FAILURE,
			payload: err,
			error: true,
		});
	}
};
