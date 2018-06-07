import { combineReducers } from 'redux';
import vocabulary from './vocabulary';
import admin from './admin';

export default combineReducers({
	vocabulary,
	admin,
});
