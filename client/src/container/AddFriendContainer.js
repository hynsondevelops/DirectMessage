import { connect } from 'react-redux'
import { addFriendOp } from '../operations/index'
import AddFriend from '../components/AddFriend'

const mapStateToProps = state => ({
	user: state.user
})

const mapDispatchToProps = dispatch => {
	const addFriend = (loggedInUser, newFriend) => {
		dispatch(addFriendOp(loggedInUser, newFriend))
	}

	return {
		addFriend
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddFriend)
