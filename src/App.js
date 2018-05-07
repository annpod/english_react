import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import store from './store';
import root from './reducers/root';

import Vocabulary from './screens/vocabulary/Vocabulary';
import Family from './screens/Family';

//const history = syncHistoryWithStore(browserHistory, store);

export default () => (

	<Provider store={store}>   
	<Router>
		<Switch>
		  <Route exact path='/' component={Vocabulary}/>  
		  <Route path='/family' component={Family}/>
		</Switch>  
		</Router> 
  	</Provider>
);

