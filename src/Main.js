import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Vocabulary from './screens/vocabulary/Vocabulary';
import Family from './screens/Family';
import Words from './screens/Admin/Words';

const Main = () => (
	<App>
		<Router history={history}>
			<Switch>
				<Route path="/" component={Vocabulary} />
				<Route path="/family" component={Family} />
				<Route path="/word" component={Words} />
			</Switch>
		</Router>
	</App>
);

export default Main;
