import {
  cartAddItem,
  cartRemoveItem,
  cartSavePaymentMethod,
  cartSaveShippingAddress,
} from "../constants/cartConstants";
const initialCartState = {
  cartItems: [],
  shippingAddress: {},
};

export const cartReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case cartAddItem:
      const item = action.payload;
      // console.log(item); //payload
      // console.log(state.cartItems); //previos state cartItems
      //obj
      const itemExists = state.cartItems.find(
        (el) => el.product === item.product
      );
      // console.log(itemExists); //current state item if exists
      if (itemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((el) =>
            el.product === itemExists.product ? item : el
          ),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, item],
      };

    case cartRemoveItem:
      const productId = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.product !== productId),
      };

    case cartSaveShippingAddress:
      return { ...state, shippingAddress: action.payload };
    case cartSavePaymentMethod:
      return { ...state, paymentMethod: action.payload };

    default:
      return state; //updated state
  }
};
