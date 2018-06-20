import { combineReducers } from 'redux';
import vocabulary from './vocabulary';
import question from './question';
import admin from './admin';

export default combineReducers({
	vocabulary,
	question,
	admin,
});
