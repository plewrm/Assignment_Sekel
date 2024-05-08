import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';

test('renders Product Detail component', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Router>
        <ProductDetail />
      </Router>
    </Provider>
  );

  const titleElement = getByText(/Product Detail/i);
  expect(titleElement).toBeInTheDocument();
});
