import React, { Component } from 'react';

class ConversationsList extends Component {
  constructor(props){
    console.log(props)
    super(props);
  }

  render(){
    let conversations = []
    if (this.props.conversations != conversations){
      conversations = this.props.conversations
    }
    	conversations = conversations.map((conversation) => 
    		{
          console.log(conversation)
    			 return (<li>{conversation._id}</li>)
    		}
  	  )
  	return(
  		<div>
  		<h3> Hello and hey </h3>
  		{conversations}
  		</div>
  		)

  }
}

export default ConversationsList;