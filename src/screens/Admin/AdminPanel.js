import React, { Component } from 'react';
import { connect } from 'react-redux';
import Words from './Words';

class AdminPanel extends Component {

	constructor(props) {
		super(props);
		this.state = {
		};

	}


	render() {

		return (
			<div className="page-content">
				<Words />
			</div>
		);
	}
}


export default AdminPanel;
