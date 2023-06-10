import types from './constants';

const initialState = {
    userRegisterData: [],
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.GET_USER_DATA:
        return { ...state, userRegisterData: action.payload };
        case types.GET_BASE_PACKAGE:
        return { ...state, getBasePackage: action.payload };
        
      default:
        return state;
    }
  };
  
  export default rootReducer;