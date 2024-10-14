import { TOGGLE_CART } from '../actions/ProductActions';

const initialState = [];

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_CART:
      const productId = action.payload;
      if (state.includes(productId)) {
        return state.filter((id) => id !== productId);
      } else {
        if (state.length < 10) {
          return [...state, productId];
        } else {
          return state;
        }
      }
    default:
      return state;
  }
};

export default cartReducer;
