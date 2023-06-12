import types from './constants';

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