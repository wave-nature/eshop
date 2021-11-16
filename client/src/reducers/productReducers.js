import {
  productListRequest,
  productListSuccess,
  productListFail,
  productDetailRequest,
  productDetailSuccess,
  productDetailFail,
} from "../constants/productContant";

const initialProductListState = { products: [] };

export const productListReducer = (state = initialProductListState, action) => {
  switch (action.type) {
    case productListRequest:
      return { loading: true, products: [] };
    case productListSuccess:
      return { loading: false, products: action.payload };
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
