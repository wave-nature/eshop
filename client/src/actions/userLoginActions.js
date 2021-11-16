import axios from "axios";
import {
  userLoginFail,
  userLoginRequest,
  userLoginSuccess,
  userLogout,
  userRegisterFail,
  userRegisterRequest,
  userRegisterSuccess,
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
