import axios from 'axios';

// Action types
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const TOGGLE_CART = 'TOGGLE_CART';

export const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const toggleCart = (productId) => ({
  type: TOGGLE_CART,
  payload: productId,
});

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      dispatch(fetchProductsSuccess(response.data));
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
};
