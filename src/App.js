import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import store from './store';
import root from './reducers/root';
import 'react-select/dist/react-select.css';
import './App.css';

import Vocabulary from './screens/vocabulary/Vocabulary';
import Family from './screens/Family';
import AdminPanel from './screens/Admin/AdminPanel';
import Words from './screens/Admin/Words';
import Question from './screens/Admin/Question';
import ChooseCorrect from './screens/ChooseCorrect/ChooseCorrect';

//const history = syncHistoryWithStore(browserHistory, store);

export default () => {

	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<Route path='/test' component={ChooseCorrect}/>
					<Route path='/family' component={Family}/>
					<Route path='/admin' component={AdminPanel}/>
					<Route path='/question' component={Question}/>
					<Route path='/word' component={Words}/>
					<Route exect path='/' component={Vocabulary}/>
				</Switch>
			</Router>
		</Provider>
	)
};

