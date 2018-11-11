import React, { Component } from 'react';
import { Button } from 'react-bootstrap';


class AddFriend extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let loggedInUser = this.props.user
		return (<Button bsStyle="primary" onClick={(e) => this.props.addFriend(loggedInUser, {_id: "5be784e14a41d5106fc96a46"})}>Add Friend</Button>)
	}
}

export default AddFriend;

