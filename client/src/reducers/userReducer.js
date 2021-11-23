import {
  userLoginRequest,
  userLoginSuccess,
  userLoginFail,
  userLogout,
  userRegisterRequest,
  userRegisterSuccess,
  userRegisterFail,
  userDetailsRequest,
  userDetailsSuccess,
  userDetailsFail,
  userUpdateRequest,
  userUpdateSuccess,
  userUpdateFail,
  userDetailsReset,
  userListRequest,
  userListSuccess,
  userListFail,
  userDeleteRequest,
  userDeleteSuccess,
  userDeleteFail,
  userUpdateByAdminRequest,
  userUpdateByAdminSuccess,
  userUpdateByAdminFail,
  userUpdateByAdminReset,
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

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case userDetailsRequest:
      return {
        loading: true,
      };
    case userDetailsSuccess:
      return {
        loading: false,
        user: action.payload,
      };
    case userDetailsFail:
      return {
        loading: false,
        error: action.payload,
      };
    case userDetailsReset:
      return { user: {} };

    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case userUpdateRequest:
      return {
        loading: true,
      };
    case userUpdateSuccess:
      return {
        loading: false,
        success: true,
        user: action.payload,
      };
    case userUpdateFail:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case userListRequest:
      return {
        loading: true,
      };
    case userListSuccess:
      return {
        loading: false,
        users: action.payload,
      };
    case userListFail:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case userDeleteRequest:
      return {
        loading: true,
      };
    case userDeleteSuccess:
      return {
        loading: false,
        success: true,
      };
    case userDeleteFail:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const userUpdateByAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case userUpdateByAdminRequest:
      return {
        loading: true,
      };
    case userUpdateByAdminSuccess:
      return {
        loading: false,
        success: true,
      };
    case userUpdateByAdminFail:
      return {
        loading: false,
        error: action.payload,
      };
    case userUpdateByAdminReset:
      return {};

    default:
      return state;
  }
};
