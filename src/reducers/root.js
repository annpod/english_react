import { combineReducers } from 'redux';
import word from './word';
import question from './question';
import admin from './admin';

export default combineReducers({
	word,
	question,
	admin,
});
