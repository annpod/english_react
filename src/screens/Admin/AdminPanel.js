import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Words from './Words';
import Test from './Test';

class AdminPanel extends Component {

	constructor(props) {
		super(props);
		this.state = {
		};

	}


	render() {

		return (
			<div className="page-content">
				<Tabs defaultIndex={0}>
					<TabList>
						<Tab>Vocabulary</Tab>
						<Tab>Test</Tab>
					</TabList>

					<TabPanel>
						<Words />
					</TabPanel>
					<TabPanel>
						<Test />
					</TabPanel>
				</Tabs>

			</div>
		);
	}
}


export default AdminPanel;
