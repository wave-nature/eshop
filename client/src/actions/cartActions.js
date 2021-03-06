import axios from "axios";
import {
  cartAddItem,
  cartRemoveItem,
  cartSavePaymentMethod,
  cartSaveShippingAddress,
} from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: cartAddItem,
      payload: {
        product: data.product._id,
        name: data.product.name,
        image: data.product.image,
        price: data.product.price,
        countInStock: data.product.countInStock,
        qty,
      },
    });

    // console.log(getState().cart.cartItems);//updated state

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {}
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({ type: cartRemoveItem, payload: id });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: cartSaveShippingAddress, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (method) => (dispatch) => {
  dispatch({ type: cartSavePaymentMethod, payload: method });
  localStorage.setItem("paymentMethod", method);
};
