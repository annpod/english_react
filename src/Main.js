import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import PrimaryLayout from '/screens/PrimaryLayout';

const Main = () => (
	<App centered={false}>
		<NotificationIntoToast />
		<Router>
			<Switch>
				<Route path="/invite/:id" component={EmailConfirmation} />
				<Route path="/login" component={Login} />
				<AuthorizedRoute path="/" component={PrimaryLayout} />
				<Route path="/*" component={NotFound} />
			</Switch>
		</Router>
	</App>
);

export default Main;

