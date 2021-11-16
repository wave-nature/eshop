import {
  userLoginRequest,
  userLoginSuccess,
  userLoginFail,
  userLogout,
  userRegisterRequest,
  userRegisterSuccess,
  userRegisterFail,
} from "../constants/userConstant";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case userLoginRequest:
      return {
        loading: true,
      };
    case userLoginSuccess:
      return {
        loading: false,
        user: action.payload,
      };
    case userLoginFail:
      return {
        loading: false,
        error: action.payload,
      };
    case userLogout:
      return {};

    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case userRegisterRequest:
      return {
        loading: true,
      };
    case userRegisterSuccess:
      return {
        loading: false,
        user: action.payload,
      };
    case userRegisterFail:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
