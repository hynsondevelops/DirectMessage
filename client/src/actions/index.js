export const updateUserEmail = email => ({
  type: 'updateUserEmail',
  email
})

export const updateUserPassword = password => ({
  type: 'updateUserPassword',
  password
})

export function updateUserName(username) {
  return {
    type: 'updateUserName',
    username
  }
}

export const updatePasswordConfirmation = passwordConfirm => ({
  type: 'updatePasswordConfirmation',
  passwordConfirm
})

export const registerUser = user => ({
  type: 'registerUser',
  user
})

export const loginUser = user =>({
  type: 'loginUser',
  user
})