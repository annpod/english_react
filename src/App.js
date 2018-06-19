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

//const history = syncHistoryWithStore(browserHistory, store);

export default () => (

	<Provider store={store}>   
	<Router>
		<Switch>
			<Route exact path='/' component={Vocabulary}/>
			<Route path='/family' component={Family}/>
			<Route path='/admin' component={AdminPanel}/>
		</Switch>  
		</Router> 
  	</Provider>
);

