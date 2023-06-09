import types from './constants';

export const userRegisterData = (data) => {
  return {type: types.GET_USER_DATA, payload: data};
};