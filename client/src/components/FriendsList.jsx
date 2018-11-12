import React, { Component } from 'react';

class FriendsList extends Component {
  constructor(props){
    super(props);
  }

  render(){
  	let loggedInUser = this.props.user
  	console.log(this.props.friends)
	const friends = this.props.friends.map((friend) => 
		{
			console.log(friend.name)
			 return (<li>{friend.name}</li>)
		}
  	)

  	return(
  		<div>
  		<h3> Hello there </h3>
  		{friends}
  		</div>
  		)

  }
}

export default FriendsList;