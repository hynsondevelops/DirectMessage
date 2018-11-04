const loggedIn = (state = [], action) => {
  switch (action.type) {
    case 'updateUserEmail':
      return [
        ...state,
        {
          user: action.user
        }
      ]
    case 'updateUserPassword':
      return [
        ...state,
        {
          user: action.user
        }
      ]
    case 'updateUserName':
      return [
        ...state,
        {
          user: action.user
        }
      ]
    case 'updateUserPasswordConfirmation':
      return [
        ...state,
        {
          user: action.user
        }
      ]
    case 'registerUser':
      return [
        ...state,
        {
          user: action.user
        }
      ]
    case 'loginUser':
      return [
        ...state,
        {
          user: action.user
        }
      ]
    default: 
      return state;
  }
};

export default loggedIn;