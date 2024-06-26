import {getLocationID} from './action';
import types from './constants';

const initialState = {
  userRegisterData: [],
  isAuthorized: false,
  logout: '',
  getCompleteData: [],
  getPlanPurchage: [],
  getBasePackage: [],
  getGraphData: [],
  getLocationID: 0,
  getPackageStatus: false,
  getUserID: '',
  getEmailDAta: '',
  getkwhData: '',
  getRemainingData: [],
  RemainingDataGet: [],
  getWeekKwhdata: '',
  getWeekGraphData: [],
  getBoxTwoDataForDashboard: [],
  getPriceAndDetailsDataforDashboard: [],
  getChargerStatus: '',
  getDataForPayment: [],
  userSubsData: [],
  getPurchaseData: [],
  getDeviceID: '',
  userProfileData: [],
  getCardDetails: [],
  getCurrentPlan: [],
  getMonthData: [],
  getQuarterData: [],
  getYearData: [],
  getPlanStatus: [],
  subscriptionStatus: '0',
  maintainence: false,
  overusage: false,
  resetApp: null,
  overModelView: false,
  overusageCount: 0,
  getMyLocation: '',
  getPurchaseAllPlans: [],
  getSubscriptionCancelStatus: 0
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_LOCATION_ID:
      return {...state, getLocationID: action.payload};
    case types.SET_IS_AUTHORIZED:
      return {...state, isAuthorized: action.payload};
    case types.GET_PACKAGE_STATUS:
      return {...state, getPackageStatus: action.payload};
    case types.GET_KWH_DATA:
      return {...state, getkwhData: action.payload};
    case types.GET_USER_ID:
      return {...state, getUserID: action.payload};
    case types.GET_EMAIL_DATA:
      return {...state, getEmailDAta: action.payload};
    case types.GET_USER_DATA:
      return {...state, userRegisterData: action.payload};
    case types.GET_PROFILE_DATA:
      return {...state, userProfileData: action.payload};
    case types.GET_BASE_PACKAGE:
      return {...state, getBasePackage: action.payload};

    case types.GET_COMPLETE_DATA:
      return {...state, getCompleteData: action.payload};
    case types.GET_PLAN_PURCHAGE:
      return {...state, getPlanPurchage: action.payload};

    case types.GET_GRAPH_DATA:
      return {...state, getGraphData: action.payload};
    case types.GET_REMAINING_DATA:
      return {...state, getRemainingData: action.payload};
    // case types.REMAINING_DATA_GET:
    //   return {...state, RemainingDataGet: action.payload};
    //week reducer start
    case types.GET_WEEK_KWH:
      return {...state, getWeekKwhdata: action.payload};
    case types.GET_WEEK_GRAPH_DATA:
      return {...state, getWeekGraphData: action.payload};
    case types.GET_MONTH_DATA:
      return {...state, getMonthData: action.payload};
    case types.GET_QUARTER_DATA:
      return {...state, getQuarterData: action.payload};
    case types.GET_YEAR_DATA:
      return {...state, getYearData: action.payload};
    //week reducer end
    //dashboard boxtwo and price details data start
    case types.GET_PRICE_AND_DETAILS_DATA:
      return {...state, getPriceAndDetailsDataforDashboard: action.payload};
    case types.GET_BOX_TWO_DATA_DASHBOARD:
      return {...state, getBoxTwoDataForDashboard: action.payload};
    case types.CHARGER_STATUS:
      return {...state, getChargerStatus: action.payload};
    case types.DATA_FOR_PAYMENT:
      return {...state, getDataForPayment: action.payload};
    case types.USER_SUBS_DATA:
      return {...state, userSubsData: action.payload};
    case types.GET_PURCHASE_DATA:
      return {...state, getPurchaseData: action.payload};
    case types.SET_PUCHASE_ALL_PLANS:
      return {...state, getPurchaseAllPlans: action.payload};
    case types.GET_DEVICE_ID:
      return {...state, getDeviceID: action.payload};
    case types.GET_OVERUSAGE:
      return {...state, overusage: action.payload};
    //dashboard boxtwo and price details data end
    case types.GET_CARD_DETAILS:
      return {...state, getCardDetails: action.payload};
    case types.GET_CURRENT_PLAN:
      return {...state, getCurrentPlan: action.payload};
    case types.GET_PLAN_STATUS:
      return {...state, getPlanStatus: action.payload};
    case types.GET_SUBSCRIPTIONSTATUS:
      return {...state, subscriptionStatus: action.payload};
    case types.MAINTAINENCE:
      return {...state, maintainence: action.payload};
    case types.OVER_MODEL_VIEW:
      return {...state, overModelView: action.payload};
    case types.OVERUSAGE_COUNT:
      return {...state, overusageCount: action.payload};
    case types.LOCATION_ID:
      return {...state, getMyLocation: action.payload};
    case types.SUBSCRIPTION_CANCEL_STATUS:
      return {...state, getSubscriptionCancelStatus: action.payload};
    case types.LOG_OUT:
      return {...initialState};
    case types.RESET_APP:
      return {...initialState};
    default:
      return state;
  }
};

export default rootReducer;
