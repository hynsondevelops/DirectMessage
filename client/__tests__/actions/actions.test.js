import * as actions from '../../src/actions/index.js'

describe('actions', () => {
  it('should update user email', () => {
    const email = 'abcd@email.com'
    const expectedAction = {
      type: "updateUserEmail",
      email
    }
    expect(actions.updateUserEmail(email)).toEqual(expectedAction)
  })


  it('should update user password', () => {
    const password = 'password'
    const expectedAction = {
      type: "updateUserPassword",
      password
    }
    expect(actions.updateUserPassword(password)).toEqual(expectedAction)
  })

  it('should update user name', () => {
    const username = 'name'
    const expectedAction = {
      type: "updateUserName",
      username
    }
    expect(actions.updateUserName(username)).toEqual(expectedAction)
  })

  it('should update user password confirmation', () => {
    const passwordConfirm = 'password'
    const expectedAction = {
      type: "updatePasswordConfirmation",
      passwordConfirm
    }
    expect(actions.updatePasswordConfirmation(passwordConfirm)).toEqual(expectedAction)
  })

  it('should create an action to request a user to be registered', () => {
    const expectedAction = {
      type: "userRegisterRequest"
    }
    expect(actions.userRegisterRequest()).toEqual(expectedAction)
  })

  it('should create an action when a user is registered successfully', () => {
    const user = {_id: 1 }
    const expectedAction = {
      type: "userRegisterSuccess",
      user
    }
    expect(actions.userRegisterSuccess(user)).toEqual(expectedAction)
  })

  it('should create an action when a user login fails', () => {
    const errors = "Email already taken!"
    const expectedAction = {
      type: "userLoginFailure",
      errors
    }
    expect(actions.userLoginFailure(errors)).toEqual(expectedAction)
  })

  it('should create an action to request a user to be logged in', () => {
    const expectedAction = {
      type: "userLoginRequest"
    }
    expect(actions.userLoginRequest()).toEqual(expectedAction)
  })

  it('should create an action when a user is logged in successfully', () => {
    const user = {_id: 1 }
    const expectedAction = {
      type: "userLoginSuccess",
      user
    }
    expect(actions.userLoginSuccess(user)).toEqual(expectedAction)
  })

  it('should create an action when a user login fails', () => {
    const errors = "Unauthorized"
    const expectedAction = {
      type: "userLoginFailure",
      errors
    }
    expect(actions.userLoginFailure(errors)).toEqual(expectedAction)
  })

  it('should create an action when the user\'s friends list is queried', () => {
    const friends = [{_id: 1}, {_id: 2}]
    const expectedAction = {
      type: "getFriendsInfo",
      friends
    }
    expect(actions.getFriendsInfo(friends)).toEqual(expectedAction)
  })



})

