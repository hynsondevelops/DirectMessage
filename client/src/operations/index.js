import {updateUserName, updatePasswordConfirmation, updateUserPassword, updateUserEmail, userLoginRequest, userLoginSuccess, userLoginFailure, userRegisterRequest, userRegisterSuccess, userRegisterFailure } from '../actions/index';
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
	console.log(user)
	console.log("userLogin")
	return function(dispatch) {
		dispatch(userLoginRequest())
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
			return false;
		}
		console.log("API Inc")
		//request action
		return axiosClient
		.post('/user/login', {email: givenEmail, name: givenName, password: givenPassword})
		.then(response => {
			console.log(response.data)
			dispatch(userLoginSuccess(response.data))
		})
		.catch(error => {
		     dispatch(userLoginFailure(error))
		   }); 
	}

}

export function userRegister(user) {
	console.log(user)
	console.log("userRegister")
	return function(dispatch) {
		dispatch(userRegisterRequest)
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
			return false;
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