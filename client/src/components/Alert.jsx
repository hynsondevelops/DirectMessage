import React, { Component } from 'react';

class Alert extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let alerts = this.props.alerts
		if (alerts) {
			return <h3 className="alert"> {alerts} </h3>
		}
		else {
			return (null)
		}
	}
}

export default Alert;