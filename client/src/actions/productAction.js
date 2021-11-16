import axios from "axios";
import {
  productListRequest,
  productListSuccess,
  productListFail,
  productDetailRequest,
  productDetailSuccess,
  productDetailFail,
} from "../constants/productContant";

//action thunk
export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: productListRequest });

    const { data } = await axios.get("/api/products");

    dispatch({ type: productListSuccess, payload: data.products });
  } catch (error) {
    console.log(error);
    dispatch({
      type: productListFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: productDetailRequest });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({ type: productDetailSuccess, payload: data.product });
  } catch (error) {
    console.log(error);
    dispatch({
      type: productDetailFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
