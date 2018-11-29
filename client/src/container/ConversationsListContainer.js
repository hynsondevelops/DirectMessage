import React, { Component } from 'react';
import ConversationsList from '../components/ConversationsList';
import { connect } from 'react-redux'


const mapStateToProps = state => ({
	conversations: state.user.conversations
})		

const mapDispatchToProps = state => ({

})

export default connect(
  mapStateToProps
)(ConversationsList)

