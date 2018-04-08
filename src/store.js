import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import root from './reducers/root';

export default createStore(
	root,
	composeWithDevTools(
		applyMiddleware(
			thunk,
			routerMiddleware(history),
		),
	),
);

