import React, { Component } from 'react';

class Alert extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log(this.props.alerts)
		let alerts = this.props.alerts
		if (alerts) {
			return <h3> {alerts} </h3>
		}
		else {
			return (null)
		}
	}
}

export default Alert;