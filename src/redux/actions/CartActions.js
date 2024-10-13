import { TOGGLE_CART } from './ProductActions';

export const toggleCart = (productId) => ({
  type: TOGGLE_CART,
  payload: productId,
});
