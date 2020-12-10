const initState = {
    authError: null
  }
  
const authReducer = (state = initState, action) => {
  switch(action.type){
    case 'LOGIN_ERROR':
      return {
        ...state,
        authError: 'Login failed'
      }

    case 'LOGIN_SUCCESS':
      return {
        authError: null
      }

    case 'SIGNOUT_SUCCESS':
      return state;

    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        authError: null
      }

    case 'SIGNUP_ERROR':

      return {
        ...state,
        authError: action.err.message
      }

    case 'UPDATE_SUCCESS':
      return state

    case 'UPDATE_ERROR':
      return state

    default:
      return state
  }
};

export default authReducer;