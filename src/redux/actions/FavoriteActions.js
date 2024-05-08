import { TOGGLE_FAVORITE } from './ProductActions';

export const toggleFavorite = (productId) => ({
  type: TOGGLE_FAVORITE,
  payload: productId,
});
