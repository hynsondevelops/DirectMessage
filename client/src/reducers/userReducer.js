const INITIAL_USER_STATE = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: ""
}

const user = (state = [], action) => {
  console.log(action)
  switch (action.type) {
    case 'updateUserEmail':
      return Object.assign({}, state, {email: action.email})
    case 'updateUserPassword':
      return Object.assign({}, state, {password: action.password})
    case 'updateUserName':
      console.log("HI HELLO")
      return Object.assign({}, state, {name: action.username})

    case 'updatePasswordConfirmation':
      return Object.assign({}, state, {passwordConfirm: action.passwordConfirm})
    case 'registerUser':
      return [
        ...state,
        {
          user: action.user
        }
      ]
    case 'loginUser':
      return Object.assign({}, state, {token: action.user.token})
    default: 
      return INITIAL_USER_STATE
  }
}

export default user