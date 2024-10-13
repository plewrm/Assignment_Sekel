import axios from 'axios';

// Action types
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';

// Action creator for fetching products success
export const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

// Action creator for toggling favorite
export const toggleFavorite = (productId) => ({
  type: TOGGLE_FAVORITE,
  payload: productId,
});

// Asynchronous action to fetch products
export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      // Send GET request to fetch products from API
      // const response = await axios.get('https://dummyjson.com/products');
      const response = await axios.get('https://fakestoreapi.com/products');
      // Dispatch action with fetched products data
      dispatch(fetchProductsSuccess(response.data));
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
};
