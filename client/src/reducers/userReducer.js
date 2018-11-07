const INITIAL_USER_STATE = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
  token: undefined
}

const user = (state = [], action) => {
  console.log(action)
  switch (action.type) {
    case 'updateUserEmail':
      return Object.assign({}, state, {email: action.email})
    case 'updateUserPassword':
      return Object.assign({}, state, {password: action.password})
    case 'updateUserName':
      return Object.assign({}, state, {name: action.username})
    case 'updatePasswordConfirmation':
      return Object.assign({}, state, {passwordConfirm: action.passwordConfirm})
    case 'userLoginRequest':
      return Object.assign({}, state)
    case 'userLoginSuccess':
      return Object.assign({}, state, {token: action.user.token})
    case 'userLoginFailure':
      return Object.assign({}, state, {errors: action.errors})
    case 'userRegisterRequest':
      return Object.assign({}, state)
    case 'userRegisterSuccess':
      return Object.assign({}, state, {token: action.user.token})
    case 'userRegisterFailure':
      return Object.assign({}, state, {errors: action.errors})
    default: 
      return INITIAL_USER_STATE
  }
}

export default user