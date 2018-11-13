import {updateUserName, updatePasswordConfirmation, updateUserPassword, updateUserEmail, userLoginRequest, userLoginSuccess, userLoginFailure, userRegisterRequest, userRegisterSuccess, userRegisterFailure, getFriendsInfo } from '../actions/index';
import axiosClient from '../axiosClient'

export function updateUsername(event) {
	return function(dispatch) {
		dispatch(updateUserName(event.target.value))
	}
}
export function updateUserpassword(event) {
	return function(dispatch) {
		dispatch(updateUserPassword(event.target.value))
	}
}
export function updatePasswordconfirmation(event) {
	return function(dispatch) {
		dispatch(updatePasswordConfirmation(event.target.value))
	}
}
export function updateUseremail(event) {
	return function(dispatch) {
		dispatch(updateUserEmail(event.target.value))
	}
}

export function userLogin(user) {
	return function(dispatch) {
		dispatch(userLoginRequest())
		let givenEmail = user.email;
		let givenPassword = user.password;
		console.log("API Inc")
		//request action
		return axiosClient
		.post('/user/login', {email: givenEmail, password: givenPassword})
		.then(response => {
			console.log(response.data)
			dispatch(userLoginSuccess(response.data))
			return axiosClient.get('/user/get_friends/' + "5bd761afac53c523a5b2a95c")
		})
		.then(response => {
			console.log(response)
			dispatch(getFriendsInfo(response.data))
		})
		.catch(error => {
			console.log(error)
		     dispatch(userLoginFailure(error))
		}); 
	}

}

export function userRegister(user) {
	console.log(user)
	console.log("userRegister")
	return function(dispatch) {
		dispatch(userRegisterRequest())
		console.log("dispatch")
		let givenEmail, givenName, givenPassword;
		console.log("variables declared")
		console.log(user)
		if (user.password == user.passwordConfirm) { //password and password confirm match
			givenEmail = user.email;
			givenName = user.name;
			givenPassword = user.password;
		}
		else {
			//dont make api call
			return dispatch(userRegisterFailure({response: {data: ["Password and confirmation did not match."]}}));
		}
		console.log("API Inc")
		//request action
		return axiosClient
		.post('/user/register', {email: givenEmail, name: givenName, password: givenPassword})
		.then(response => {
			console.log(response.data)
			dispatch(userRegisterSuccess(response.data))
		})
		.catch(error => {
			dispatch(userRegisterFailure(error))
		});
	}
}

export function addFriendOp(loggedInUser, newFriend) {
	return axiosClient
	.post('/user/add_friend', {loggedInUser, newFriend})
	.then(response => {
		console.log(response.data)
	})
}

export function getFriends(loggedInUser) {
	return function(dispatch) {
		return axiosClient
		.get('/user/get_friends/:user_id', {user_id: loggedInUser._id})
		.then(response => {
			console.log(response)
		})
	}	
}