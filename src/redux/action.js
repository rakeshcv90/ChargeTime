import types from './constants';

export const getLocationID = (data) => {
  return {type: types.GET_LOCATION_ID, payload: data};
};
export const getPackageStatus = (data) => {
  return {type: types.GET_PACKAGE_STATUS, payload: data};
};
export const setUserID = (data) => {
  return {type: types.GET_USER_ID, payload: data};
};
export const setKwhData = (data) => {
  return {type:types.GET_KWH_DATA,payload:data}
}
export const userRegisterData = (data) => {
  return {type: types.GET_USER_DATA, payload: data};
};
export const getBasePackage = (data) => {
  return {type:types.GET_BASE_PACKAGE,payload:data}
}

export const getCompleteData = (data) => {
  return {type:types.GET_COMPLETE_DATA,payload:data}
}
export const getPlanPurchage = (data) => {
  return {type:types.GET_PLAN_PURCHAGE,payload:data}
}

export const getGraphData = (data) => {
  return {type:types.GET_GRAPH_DATA,payload:data}
}
export const setRemainingData = (data) => {
  return {type:types.GET_REMAINING_DATA,payload:data}
}

// week action start
export const setWeekTotalData = (data) => {
  return {type:types.GET_WEEK_KWH,payload:data}
}
export const setWeekGraphData = (data) => {
  return {type:types.GET_WEEK_GRAPH_DATA,payload:data}
}

// week action end

