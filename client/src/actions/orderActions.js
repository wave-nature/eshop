import axios from "axios";
import {
  orderBelongsToMeFail,
  orderBelongsToMeRequest,
  orderBelongsToMeSuccess,
  orderCreateFail,
  orderCreateRequest,
  orderCreateSuccess,
  orderDeliverFail,
  orderDeliverRequest,
  orderDeliverSuccess,
  orderDetailFail,
  orderDetailRequest,
  orderDetailSuccess,
  orderListFail,
  orderListRequest,
  orderListSuccess,
  orderPaidFail,
  orderPaidRequest,
  orderPaidSuccess,
} from "../constants/orderConstant";

export const orderCreateAction = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: orderCreateRequest });
    const {
      userLogin: { user },
    } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.post("/api/orders", order, config);
    dispatch({ type: orderCreateSuccess, payload: data.order });
  } catch (error) {
    dispatch({
      type: orderCreateFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const orderDetailAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: orderDetailRequest });
    const {
      userLogin: { user },
    } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);
    dispatch({ type: orderDetailSuccess, payload: data.order });
  } catch (error) {
    dispatch({
      type: orderDetailFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const orderPaidAction =
  (id, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({ type: orderPaidRequest });
      const {
        userLogin: { user },
      } = getState();

      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/orders/${id}/pay`,
        paymentResult,
        config
      );
      dispatch({ type: orderPaidSuccess, payload: data.order });
    } catch (error) {
      dispatch({
        type: orderPaidFail,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const orderBelongsToMeAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: orderBelongsToMeRequest });
    const {
      userLogin: { user },
    } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/myorders`, config);
    dispatch({ type: orderBelongsToMeSuccess, payload: data.orders });
  } catch (error) {
    dispatch({
      type: orderBelongsToMeFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const orderListAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: orderListRequest });
    const {
      userLogin: { user },
    } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders`, config);
    dispatch({ type: orderListSuccess, payload: data.orders });
  } catch (error) {
    dispatch({
      type: orderListFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const orderDeliverAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: orderDeliverRequest });
    const {
      userLogin: { user },
    } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    };

    await axios.put(`/api/orders/${id}/deliver`, {}, config);
    dispatch({ type: orderDeliverSuccess });
  } catch (error) {
    dispatch({
      type: orderDeliverFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
