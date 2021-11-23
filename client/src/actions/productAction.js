import axios from "axios";
import {
  productListRequest,
  productListSuccess,
  productListFail,
  productDetailRequest,
  productDetailSuccess,
  productDetailFail,
  productDeleteRequest,
  productDeleteSuccess,
  productDeleteFail,
  productCreateRequest,
  productCreateFail,
  productCreateSuccess,
  productUpdateRequest,
  productUpdateSuccess,
  productUpdateFail,
  productReviewRequest,
  productReviewSuccess,
  productReviewFail,
  productTopRequest,
  productTopSuccess,
  productTopFail,
} from "../constants/productContant";

//action thunk
export const listProducts =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: productListRequest });

      const { data } = await axios.get(
        `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
      );

      dispatch({
        type: productListSuccess,
        payload: {
          products: data.products,
          page: data.page,
          pages: data.pages,
        },
      });
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

export const productDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: productDeleteRequest });
    const user = getState().userLogin.user;
    const token = user.token;

    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    await axios.delete(`/api/products/${id}`, config);
    dispatch({ type: productDeleteSuccess });
  } catch (error) {
    dispatch({
      type: productDeleteFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const productCreateAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: productCreateRequest });
    const user = getState().userLogin.user;
    const token = user.token;

    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(`/api/products`, {}, config);
    dispatch({ type: productCreateSuccess, payload: data.product });
  } catch (error) {
    dispatch({
      type: productCreateFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const productUpdateAction = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: productUpdateRequest });
    const user = getState().userLogin.user;
    const token = user.token;

    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );
    dispatch({ type: productUpdateSuccess, payload: data.updatedProduct });
  } catch (error) {
    dispatch({
      type: productUpdateFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const productReviewAction =
  (id, reviewData) => async (dispatch, getState) => {
    try {
      dispatch({ type: productReviewRequest });
      const user = getState().userLogin.user;
      const token = user.token;

      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      await axios.post(`/api/products/${id}/reviews`, reviewData, config);
      dispatch({ type: productReviewSuccess });
    } catch (error) {
      dispatch({
        type: productReviewFail,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const topProducts = () => async (dispatch) => {
  try {
    dispatch({ type: productTopRequest });

    const { data } = await axios.get(`/api/products/popular`);

    dispatch({
      type: productTopSuccess,
      payload: data.products,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: productTopFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
