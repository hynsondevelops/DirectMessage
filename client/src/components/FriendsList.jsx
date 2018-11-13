import React, { Component } from 'react';

class FriendsList extends Component {
  constructor(props){
    console.log(props)
    super(props);
  }

  render(){
    let friends = []
    	friends = this.props.friends.map((friend) => 
    		{
          console.log(friend)
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