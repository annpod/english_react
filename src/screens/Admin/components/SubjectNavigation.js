import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../Components/Button';

const navList = [{
		value: "english",
		label: "English"
	},
	{
		value: "maths",
		label: "Maths"
	}
]

class SubjectNavigation extends Component {

	constructor(props) {
		super(props);
		this.state = {
			subject: navList[0].value,
		};
		this.onClick = this.onClick.bind(this);
	}

	onClick(e) {
		const subject = e.target.value;	
		this.setState({ subject });	
		this.props.onClick(subject);
	}

	render() {
		const { activeIndex, subject } = this.state;
		return (
			<ul className="subject-nav">
				{navList.map((item, index) => (
					<li className="subject-nav__item" key={index}>
						<Button
							type='button'
							label={item.label}
							value={item.value}
							active={subject === item.value}
							onClick={this.onClick}
						/>
					</li>
				))}				
			</ul>
		);
	}
}

const mapStateToProps = (state) => ({
	
});

const mapDispatchToProps = {
	
};

export default connect(mapStateToProps, mapDispatchToProps)(SubjectNavigation);

