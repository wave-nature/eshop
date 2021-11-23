import {
  orderBelongsToMeFail,
  orderBelongsToMeRequest,
  orderBelongsToMeReset,
  orderBelongsToMeSuccess,
  orderCreateFail,
  orderCreateRequest,
  orderCreateSuccess,
  orderDeliverFail,
  orderDeliverRequest,
  orderDeliverReset,
  orderDeliverSuccess,
  orderDetailFail,
  orderDetailRequest,
  orderDetailReset,
  orderDetailSuccess,
  orderListFail,
  orderListRequest,
  orderListSuccess,
  orderPaidFail,
  orderPaidRequest,
  orderPaidReset,
  orderPaidSuccess,
} from "../constants/orderConstant";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case orderCreateRequest:
      return { loading: true };
    case orderCreateSuccess:
      return { loading: false, success: true, order: action.payload };
    case orderCreateFail:
      return { loading: false, error: action.payload };
    default:
      return state; //updated state
  }
};

export const orderDetailReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case orderDetailRequest:
      return { loading: true, ...state };
    case orderDetailSuccess:
      return { loading: false, order: action.payload };
    case orderDetailFail:
      return { loading: false, error: action.payload };
    case orderDetailReset:
      return { orderItems: [], shippingAddress: {} };
    default:
      return state; //updated state
  }
};

export const orderPaidReducer = (state = {}, action) => {
  switch (action.type) {
    case orderPaidRequest:
      return { loading: true };
    case orderPaidSuccess:
      return { loading: false, success: true };
    case orderPaidFail:
      return { loading: false, error: action.payload };
    case orderPaidReset:
      return {};
    default:
      return state; //updated state
  }
};

export const orderBelongsToMeReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case orderBelongsToMeRequest:
      return { loading: true };
    case orderBelongsToMeSuccess:
      return { loading: false, orders: action.payload };
    case orderBelongsToMeFail:
      return { loading: false, error: action.payload };
    case orderBelongsToMeReset:
      return { orders: [] };
    default:
      return state; //updated state
  }
};

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case orderListRequest:
      return { loading: true };
    case orderListSuccess:
      return { loading: false, orders: action.payload };
    case orderListFail:
      return { loading: false, error: action.payload };
    // case orderListReset:
    //   return { orders: [] };
    default:
      return state; //updated state
  }
};

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case orderDeliverRequest:
      return { loading: true };
    case orderDeliverSuccess:
      return { loading: false, success: true };
    case orderDeliverFail:
      return { loading: false, error: action.payload };
    case orderDeliverReset:
      return {};
    default:
      return state; //updated state
  }
};
