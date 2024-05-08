import { FETCH_PRODUCTS_SUCCESS, TOGGLE_FAVORITE } from '../actions/ProductActions';

const initialState = {
  products: [],
};

// Reducer function for products
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    // Action case for fetching products success
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload, 
      };
    // Action case for toggling favorite status
    case TOGGLE_FAVORITE:
      const productId = action.payload;
      const updatedProducts = state.products.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            isFavorite: !product.isFavorite,
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
