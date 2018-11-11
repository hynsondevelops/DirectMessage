const INITIAL_ALERT_STATE = null
const alerts = (state = [], action) => {
  switch (action.type) {
    case 'userLoginSuccess':
      return `Welcome back, ${action.user.email}!`
    case 'userLoginFailure':
      return action.errors.response.data
    case 'userRegisterSuccess':
      return `${action.user.email} has been registered successfully!`
    case 'userRegisterFailure':
      return action.errors.response.data
    default: 
      return INITIAL_ALERT_STATE
  }
}

export default alerts;