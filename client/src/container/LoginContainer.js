import { connect } from 'react-redux'
import { updateUsername, updateUseremail, updatePasswordconfirmation, updateUserpassword } from '../operations/index'
import Login from '../components/Login'

const mapStateToProps = state => ({
	loggedIn: 0,
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



	return {
		updateUserName,
		updateUserPassword,
		updatePasswordConfirmation,
		updateUserEmail
	}
	/*
	updateUserEmail: email => dispatch(updateUserEmail(email)),
	updateUserPassword: password => dispatch(updateUserPassword(password)),
	updateUserName: username => dispatch(updateUserName(username)),
	updatePasswordConfirmation: passwordConfirm => dispatch(updatePasswordConfirmation(passwordConfirm)),
	loginUser: user => dispatch(loginUser(user))*/
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
