import axios from "axios";
import { orderBelongsToMeReset } from "../constants/orderConstant";
import {
  userDeleteRequest,
  userDeleteSuccess,
  userDetailsFail,
  userDetailsRequest,
  userDetailsReset,
  userDetailsSuccess,
  userListFail,
  userListRequest,
  userListSuccess,
  userLoginFail,
  userLoginRequest,
  userLoginSuccess,
  userLogout,
  userRegisterFail,
  userRegisterRequest,
  userRegisterSuccess,
  userUpdateByAdminFail,
  userUpdateByAdminRequest,
  userUpdateByAdminSuccess,
  userUpdateFail,
  userUpdateRequest,
  userUpdateSuccess,
} from "../constants/userConstant";

export const userLoginActions = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: userLoginRequest });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({ type: userLoginSuccess, payload: data });

    localStorage.setItem("user", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: userLoginFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("user");
  dispatch({ type: userLogout });
  dispatch({ type: userDetailsReset });
  dispatch({ type: orderBelongsToMeReset });
};

export const userRegisterActions =
  (name, email, password) => async (dispatch) => {
    try {
      dispatch({ type: userRegisterRequest });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/users/signup",
        { name, email, password },
        config
      );

      dispatch({ type: userRegisterSuccess, payload: data });
      dispatch({ type: userLoginSuccess, payload: data });

      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: userRegisterFail,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const userDetailsActions = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: userDetailsRequest });

    const token = getState().userLogin.user.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({ type: userDetailsSuccess, payload: data });
  } catch (error) {
    dispatch({
      type: userDetailsFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userUpdateAction = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: userUpdateRequest });

    const token = getState().userLogin.user.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(`/api/users/profile`, user, config);

    dispatch({ type: userUpdateSuccess, payload: data });
  } catch (error) {
    dispatch({
      type: userUpdateFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userListAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userListRequest });

    const token = getState().userLogin.user.token;

    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/users`, config);

    dispatch({ type: userListSuccess, payload: data });
  } catch (error) {
    dispatch({
      type: userListFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: userDeleteRequest });

    const token = getState().userLogin.user.token;

    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    await axios.delete(`/api/users/${id}`, config);

    dispatch({ type: userDeleteSuccess });
  } catch (error) {
    dispatch({
      type: userListFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userUpdateByAdminAction = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: userUpdateByAdminRequest });

    const token = getState().userLogin.user.token;

    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(`/api/users/${user._id}`, user, config);

    dispatch({ type: userUpdateByAdminSuccess });
    dispatch({ type: userDetailsSuccess, payload: data });
  } catch (error) {
    dispatch({
      type: userUpdateByAdminFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
