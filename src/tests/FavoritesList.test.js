import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import FavoritesList from '../components/FavoritesList';

test('renders Favorites List component', () => {
  const { getByText } = render(
    <Provider store={store}>
      <FavoritesList />
    </Provider>
  );

  const titleElement = getByText(/Favorite Products/i);
  expect(titleElement).toBeInTheDocument();
});
