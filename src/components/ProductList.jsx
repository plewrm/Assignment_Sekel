import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, toggleCart } from '../redux/actions/ProductActions';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button, Input, Pagination, Alert, Select, Slider, Rate } from 'antd';

const { Meta } = Card;
const { Option } = Select;

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minRating, setMinRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 500);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 500);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const itemsPerPage = 10;

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage(null);

    dispatch(fetchProducts())
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setIsLoading(false);
        setErrorMessage('Error fetching products. Please try again.');
      });
  }, [dispatch]);

  const handleToggleCart = (productId) => {
    dispatch(toggleCart(productId));
  };

  //  Adding Filter products based on search query, category, price range, and rating.
  const filteredProducts = products
    ? products
      .filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((product) => (category ? product.category === category : true))
      .filter(
        (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
      )
      .filter((product) => product.rating.rate >= minRating)
    : [];

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1 className="text-center">Product's List</h1>
      <div style={{ display: 'flex', flexDirection:isMobile ? 'column' :'row', alignItems:'center' , justifyContent:'space-between'}}>
        <Input
          placeholder="Search products"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginBottom: '20px' , width: isMobile ? '100%' : '20%'}}
        />

        <Select
          placeholder="Select Category"
          style={{ width: 200, marginRight: 10, marginBottom: '20px' , width: isMobile ? '100%' : '20%'}}
          onChange={(value) => setCategory(value)}
          allowClear
        >
          <Option value="men's clothing">Men's Clothing</Option>
          <Option value="women's clothing">Women's Clothing</Option>
          <Option value="jewelery">Jewelery</Option>
          <Option value="electronics">Electronics</Option>
        </Select>

        <div style={{ marginBottom: '20px' }}>
          <span>Price Range: </span>
          <Slider
            range
            min={0}
            max={1000}
            defaultValue={[0, 1000]}
            value={priceRange}
            onChange={(value) => setPriceRange(value)}
            style={{ width: 300 }}
          />
          <span>${priceRange[0]} - ${priceRange[1]}</span>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <span>Minimum Rating: </span>
          <Rate allowHalf value={minRating} onChange={setMinRating} />
        </div>
      </div>


      {errorMessage && (
        <Alert
          message={errorMessage}
          type="error"
          closable
          onClose={() => setErrorMessage(null)}
          style={{ marginBottom: '20px' }}
        />
      )}

      {isLoading ? (
        <p id="loading"></p>
      ) : (
        <div className="product-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {currentProducts.map((product) => (
            <Card
              key={product.id}
              style={{ width: isMobile ? '100%' :'30%', marginBottom: 20, cursor: 'pointer', padding:'20px' }}
              cover={<img alt={product.title} src={product.image} style={{ height: 300, objectFit: 'contain' }} />}
              onClick={() => navigate(`/product/${product.id}`)}
              actions={[
                <Button
                  type="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleCart(product.id);
                  }}
                >
                  {cart.includes(product.id) ? 'Remove From Cart' : 'Add To Cart'}
                </Button>,
              ]}
            >
              <p style={{ fontWeight: 'bold', fontSize: '16px' }}>${product.price}</p>
              <Meta title={product.title} description={product.description.slice(0, 100)} />
            </Card>
          ))}
        </div>
      )}

      <Pagination
        current={currentPage}
        pageSize={itemsPerPage}
        total={filteredProducts.length}
        onChange={handlePageChange}
        style={{ marginTop: '20px', textAlign: 'center' }}
      />
    </div>
  );
};

export default ProductList;
