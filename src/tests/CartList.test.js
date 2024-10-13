import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import CartList from '../components/CartList';

test('renders Cart List component', () => {
  const { getByText } = render(
    <Provider store={store}>
      <CartList />
    </Provider>
  );

  const titleElement = getByText(/Cart Products/i);
  expect(titleElement).toBeInTheDocument();
});
