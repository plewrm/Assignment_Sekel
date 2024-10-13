import { FETCH_PRODUCTS_SUCCESS, TOGGLE_CART } from '../actions/ProductActions';

const initialState = {
  products: [],
};

// Reducer function for products
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload, 
      };
    case TOGGLE_CART:
      const productId = action.payload;
      const updatedProducts = state.products.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            isCart: !product.isCart,
          };
        }
        return product;
      });
      return {
        ...state,
        products: updatedProducts,
      };
    default:
      return state;
  }
};

export default productReducer;
