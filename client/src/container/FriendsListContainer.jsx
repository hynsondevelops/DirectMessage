import React, { Component } from 'react';
import FriendsList from '../components/FriendsList';
import { connect } from 'react-redux'

const mapStateToProps = state => ({
	
	friends: [
		{ "_id" : ("5be898a90e74312895544f61"), "conversations" : [ ], "friends" : [ ], "email" : "alexprice@gmail.com", "name" : "Alex Price", "password" : "$2a$10$yusDFAX2tb49CA3QQFAecuUj9Ki1UtfidAGVnlflkwEaMt1vgVFFO", "__v" : 0 },
		{ "_id" : ("5be8af9f0e74312895544f65"), "conversations" : [ ], "friends" : [ ], "email" : "simonsemail@email.com", "name" : "simond", "password" : "$2a$10$XXUOk2gW12P9f.NfE4oqDeb15juam87PwdrZ3wvrKbu..5NeOZ9GO", "__v" : 0 }
		]
	})

export default connect(
  mapStateToProps
)(FriendsList)

