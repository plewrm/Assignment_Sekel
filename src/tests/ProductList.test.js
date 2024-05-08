import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import ProductList from '../components/ProductList';

test('renders Product List component', () => {
  const { getByText } = render(
    <Provider store={store}>
      <ProductList />
    </Provider>
  );

  const titleElement = getByText(/Product List/i);
  expect(titleElement).toBeInTheDocument();
});
