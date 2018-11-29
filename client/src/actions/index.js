export const updateUserEmail = email => ({
  type: 'updateUserEmail',
  email
})

export const updateUserPassword = password => ({
  type: 'updateUserPassword',
  password
})

export const updateUserName = (username) => ({
  type: 'updateUserName',
  username
})

export const updatePasswordConfirmation = passwordConfirm => ({
  type: 'updatePasswordConfirmation',
  passwordConfirm
})

export const userRegisterRequest = () => ({
  type: 'userRegisterRequest'
})

export const userRegisterSuccess = user => ({
  type: 'userRegisterSuccess',
  user
})

export const userRegisterFailure = (errors) => ({
  type: 'userRegisterFailure',
  errors
})


export const userLoginRequest = () => ({
  type: 'userLoginRequest'
})

export const userLoginSuccess = user =>({
  type: 'userLoginSuccess',
  user
})

export const userLoginFailure = (errors) => ({
  type: 'userLoginFailure',
  errors
})

export const getFriendsInfo = (friends) => ({
  type: 'getFriendsInfo',
  friends
})

export const getConversationsInfo = (conversations) =>({
  type: 'getConversationsInfo',
  conversations
})

