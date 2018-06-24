import React, { Component } from 'react';
import { connect } from 'react-redux';

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
		activeIndex: 0
		};
	this.onClick = this.onClick.bind(this);
	}

	onClick(value, index) {
	console.log("value,index", value,index);
		const subject = value;	
		this.setState({activeIndex: index});	
		this.props.onClick(subject);
	}

	render() {
		const { activeIndex } = this.state;
		return (
			<ul className="subject-nav">
			{navList.map((item, index) => (
				<li className="subject-nav__item" key={index}>
					<button value={item.value} className={index === activeIndex ? "active" : ""} onClick={() => this.onClick(item.value, index)}>{item.label}</button>
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

