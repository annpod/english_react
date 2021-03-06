import {
	addQuestion as addQuestionApi,
	/*getQuestionList as getQuestionListApi,*/
	updateQuestion as updateQuestionApi,
	deleteQuestion as deleteQuestionApi,
	getQuestionListBySubject as getQuestionListBySubjectApi,
} from '../api/api';
import {
	ADD_QUESTION_START,
	ADD_QUESTION_SUCCESS,
	ADD_QUESTION_FAILURE,
	UPDATE_QUESTION_START,
	UPDATE_QUESTION_SUCCESS,
	UPDATE_QUESTION_FAILURE,
	DELETE_QUESTION_START,
	DELETE_QUESTION_SUCCESS,
	DELETE_QUESTION_FAILURE,
	GET_QUESTION_LIST_START,
	GET_QUESTION_LIST_SUCCESS,
	GET_QUESTION_LIST_FAILURE,
	CATEGORY_LIST_QUESTION,
	SAVE_CATEGORY_QUESTION
} from './index';

export const categoryList = (categoryList) => {
	return { type: CATEGORY_LIST_QUESTION, payload: categoryList };
};

export const saveCategoryQuestion = (category) => {
	return { type: SAVE_CATEGORY_QUESTION, payload: category };
};

export const addQuestion = (body) => async (dispatch) => {
	dispatch({ type: ADD_QUESTION_START });
	try {
		const questionList = await addQuestionApi(body);
		dispatch({
			type: ADD_QUESTION_SUCCESS,
			payload: questionList,
		});
	} catch (err) {
		dispatch({
			type: ADD_QUESTION_FAILURE,
			payload: err,
			error: true,
		});
	}
};
/*
export const getQuestionList = () => async (dispatch) => {
	dispatch({ type: GET_QUESTION_LIST_START });
	try {
		const questionList = await getQuestionListApi();
		dispatch({
			type: GET_QUESTION_LIST_SUCCESS,
			payload: questionList,
		});
	} catch (err) {
		dispatch({
			type: GET_QUESTION_LIST_FAILURE,
			payload: err,
			error: true,
		});
	}
};
*/
export const getQuestionListBySubject = (subject) => async (dispatch) => {
	dispatch({ type: GET_QUESTION_LIST_START });
	try {
		const questionList = await getQuestionListBySubjectApi(subject);
		dispatch({
			type: GET_QUESTION_LIST_SUCCESS,
			payload: questionList,
		});
	} catch (err) {
		dispatch({
			type: GET_QUESTION_LIST_FAILURE,
			payload: err,
			error: true,
		});
	}
};

export const updateQuestion = (id, body) => async (dispatch) => {
	console.log("id", id);
 	dispatch({ type: UPDATE_QUESTION_START });
 	try {
 		const question = await updateQuestionApi(id, body);
 		dispatch({
 			type: UPDATE_QUESTION_SUCCESS,
 			payload: question,
 		});
 	} catch (err) {
 		dispatch({
 			type: UPDATE_QUESTION_FAILURE,
 			payload: err,
 			error: true,
 		});
 	}
};

export const deleteQuestion = (id) => async (dispatch) => {
 	dispatch({ type: DELETE_QUESTION_START });
 	try {
 		const question = await deleteQuestionApi(id);
 		dispatch({
 			type: DELETE_QUESTION_SUCCESS,
 		});
 	} catch (err) {
 		dispatch({
 			type: DELETE_QUESTION_FAILURE,
 			payload: err,
 			error: true,
 		});
 	}
};




