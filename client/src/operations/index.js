import {updateUserName, updatePasswordConfirmation, updateUserPassword, updateUserEmail, loginUser} from '../actions/index';
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

export function userLoggedIn(user){

}

export function userLogin(event, user) {
	return function(dispatch) {
		let email, name, password;
		if (user.password == user.passwordConfirm) { //password and password confirm match
			email = user.email;
			name = user.name;
			password = user.password;
		}
		else {
			//dont make api call
			return false;
		}
		//request action
		return axiosClient
		.post('/user/login', {email: email, name: name, password: password})
		.then(response => {
			console.log(response.body)
			dispatch(loginUser(user))
		})
	}

}