import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import productReducer from './reducers/ProductReducer';
import favoriteReducer from './reducers/FavoriteReducer';


const rootReducer = combineReducers({
  products: productReducer,
  favorites: favoriteReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
