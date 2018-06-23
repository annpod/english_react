import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';


class Navigation extends Component {

	constructor(props) {
		super(props);
		this.state = {
		};

	}

	render() {
		return (
			<ul className="admin-nav">
				<li className="admin-nav__item">
					<Link to='/word'>Word</Link>
				</li>
				<li className="admin-nav__item">
					<Link to='/question'>Question</Link>
				</li>
			</ul>
		);
	}
}


export default Navigation;
