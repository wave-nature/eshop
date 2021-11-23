import {
  productListRequest,
  productListSuccess,
  productListFail,
  productDetailRequest,
  productDetailSuccess,
  productDetailFail,
  productDeleteRequest,
  productDeleteFail,
  productDeleteSuccess,
  productCreateRequest,
  productCreateSuccess,
  productCreateFail,
  productCreateReset,
  productUpdateRequest,
  productUpdateSuccess,
  productUpdateFail,
  productUpdateReset,
  productReviewRequest,
  productReviewSuccess,
  productReviewFail,
  productReviewReset,
  productTopRequest,
  productTopSuccess,
  productTopFail,
} from "../constants/productContant";

const initialProductListState = { products: [] };

export const productListReducer = (state = initialProductListState, action) => {
  switch (action.type) {
    case productListRequest:
      return { loading: true, products: [] };
    case productListSuccess:
      return {
        loading: false,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case productListFail:
      return { loading: false, error: action.payload };
    default:
      return initialProductListState;
  }
};

//PRODUCT DETAIL REDUCER

const initialProductDetailState = {
  product: { reviews: [] },
};

export const productDetailReducer = (
  state = initialProductDetailState,
  action
) => {
  switch (action.type) {
    case productDetailRequest:
      return { loading: true, ...state };
    case productDetailSuccess:
      return { loading: false, product: action.payload };
    case productDetailFail:
      return { loading: false, error: action.payload };
    default:
      return state; //updated state
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case productDeleteRequest:
      return { loading: true };
    case productDeleteSuccess:
      return { loading: false, success: true };
    case productDeleteFail:
      return { loading: false, error: action.payload };
    default:
      return state; //updated state
  }
};

export const productCreateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case productCreateRequest:
      return { loading: true };
    case productCreateSuccess:
      return { loading: false, success: true, product: action.payload };
    case productCreateFail:
      return { loading: true, error: action.payload };
    case productCreateReset:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case productUpdateRequest:
      return { loading: true };
    case productUpdateSuccess:
      return { loading: false, success: true, product: action.payload };
    case productUpdateFail:
      return { loading: true, error: action.payload };
    case productUpdateReset:
      return { product: {} };
    default:
      return state;
  }
};

export const productReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case productReviewRequest:
      return { loading: true };
    case productReviewSuccess:
      return { loading: false, success: true };
    case productReviewFail:
      return { loading: true, error: action.payload };
    case productReviewReset:
      return {};
    default:
      return state;
  }
};

export const productTopRatedReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case productTopRequest:
      return { loading: true };
    case productTopSuccess:
      return { loading: false, products: action.payload };
    case productTopFail:
      return { loading: true, error: action.payload };
    default:
      return state;
  }
};
