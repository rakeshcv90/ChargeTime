import { getLocationID } from './action';
import types from './constants';

const initialState = {
    userRegisterData: [],
    getGraphData:[],
    getLocationID:0,
    getPackageStatus:false,
    getUserID:'',
    getkwhData:'',
    getRemainingData:[],
    getWeekKwhdata:'',
    getWeekGraphData:[]
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.GET_LOCATION_ID:
        return { ...state, getLocationID: action.payload };
        case types.GET_PACKAGE_STATUS:
        return { ...state, getPackageStatus: action.payload };
        case types.GET_KWH_DATA:
        return { ...state, getkwhData: action.payload };
        case types.GET_USER_ID:
        return { ...state, getUserID: action.payload };
      case types.GET_USER_DATA:
        return { ...state, userRegisterData: action.payload };
        case types.GET_BASE_PACKAGE:
        return { ...state, getBasePackage: action.payload };
        case types.GET_GRAPH_DATA:
        return { ...state, getGraphData: action.payload }
        case types.GET_REMAINING_DATA:
        return { ...state, getRemainingData: action.payload }
        //week reducer start
        case types.GET_WEEK_KWH:
        return { ...state, getWeekKwhdata: action.payload }
        case types.GET_WEEK_GRAPH_DATA:
        return { ...state, getWeekGraphData: action.payload }
        //week reducer end
      default:
        return state;
    }
  };
  
  export default rootReducer;