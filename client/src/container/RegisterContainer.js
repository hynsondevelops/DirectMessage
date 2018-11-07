import { connect } from 'react-redux'
import { updateUsername, updateUseremail, updatePasswordconfirmation, updateUserpassword, userRegister } from '../operations/index'
import Register from '../components/Register'

const mapStateToProps = state => ({
	user: state.user
})

const mapDispatchToProps = dispatch => {
	const updateUserName = (username) => {
		dispatch(updateUsername(username))
	}
	const updateUserPassword = (password) =>{
		dispatch(updateUserpassword(password))
	}
	const updatePasswordConfirmation = (passwordConfirm) => {
		dispatch(updatePasswordconfirmation(passwordConfirm))
	}
	const updateUserEmail = (email) =>{
		dispatch(updateUseremail(email))
	}

	const registerUser = (user) => {
		dispatch(userRegister(user))
	}

	return {
		updateUserName,
		updateUserPassword,
		updatePasswordConfirmation,
		updateUserEmail,
		registerUser
	}
	/*
	updateUserEmail: email => dispatch(updateUserEmail(email)),
	updateUserPassword: password => dispatch(updateUserPassword(password)),
	updateUserName: username => dispatch(updateUserName(username)),
	updatePasswordConfirmation: passwordConfirm => dispatch(updatePasswordConfirmation(passwordConfirm)),
	registerUser: user => dispatch(registerUser(user))*/
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)
