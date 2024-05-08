import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productReducer from './reducers/ProductReducer';
import favoriteReducer from './reducers/FavoriteReducer';


const persistConfig = {
  key: 'root',
  storage,
};


const rootReducer = combineReducers({
  products: productReducer,
  favorites: favoriteReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
export default store;
