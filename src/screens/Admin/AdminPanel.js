import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Navigation from './components/Navigation';

class AdminPanel extends Component {

	constructor(props) {
		super(props);
		this.state = {
		};

	}


	render() {

		return (
			<div>
				<Navigation />
				<div className="page-content">
					
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	
});

const mapDispatchToProps = {
	
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);

