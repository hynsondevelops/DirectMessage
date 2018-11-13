import React, { Component } from 'react';
import FriendsList from '../components/FriendsList';
import { connect } from 'react-redux'

const mapStateToProps = state => ({
	friends: state.user.friends
})		

const mapDispatchToProps = state => ({

})

export default connect(
  mapStateToProps
)(FriendsList)

