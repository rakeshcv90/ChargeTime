import types from './constants'

export const initialState = {
    // userLoginData: [],
    locationId:''
}
const rootReducer = (state = initialState,  action) => {
    switch(action.type){
      case "LOCATION_ID":
        return { ...state, locationId: action.payload };   
     
        default:
          return state
    }
}

export default rootReducer