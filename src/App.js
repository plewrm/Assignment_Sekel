import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import ProductDetail from './components/ProductDetail'
import CartList from './components/CartList'
const { Header, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <Header>
          <Navbar />
        </Header>
        <Content style={{ padding: '20px' }}>
          <Routes>
            <Route exact path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartList />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
