import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Vocabulary from '/screens/Vocabulary';
import Family from '/screens/Family';

const Main = () => (
	<App>
		<Router history={history}>
			<Switch>
				<Route path="/" component={Vocabulary} />
				<Route path="/family" component={Family} />
			</Switch>
		</Router>
	</App>
);

export default Main;
