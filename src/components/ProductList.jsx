import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, toggleFavorite } from '../redux/actions/ProductActions';
import { Link,useNavigate } from 'react-router-dom';
import { Card, Button, Input, Pagination, Alert, Select, Slider, Rate } from 'antd';

const { Meta } = Card;
const { Option } = Select;

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const favorites = useSelector((state) => state.favorites);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minRating, setMinRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState(null);

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

  const handleToggleFavorite = (productId) => {
    dispatch(toggleFavorite(productId));
  };

  // Filter products based on search query, category, price range, and rating
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
      
      {/* Search input */}
      <Input
        placeholder="Search products"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '20px' }}
      />

      {/* Category filter */}
      <Select
        placeholder="Select Category"
        style={{ width: 200, marginRight: 10, marginBottom: '20px' }}
        onChange={(value) => setCategory(value)}
        allowClear
      >
        <Option value="men's clothing">Men's Clothing</Option>
        <Option value="women's clothing">Women's Clothing</Option>
        <Option value="jewelery">Jewelery</Option>
        <Option value="electronics">Electronics</Option>
      </Select>

      {/* Price range filter */}
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

      {/* Rating filter */}
      <div style={{ marginBottom: '20px' }}>
        <span>Minimum Rating: </span>
        <Rate allowHalf value={minRating} onChange={setMinRating} />
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
              style={{ width: '30%', marginBottom: 20 , cursor:'pointer'}}
              cover={<img alt={product.title} src={product.image} style={{ height: 300, objectFit: 'cover' }} />}
              onClick={() => navigate(`/product/${product.id}`)}
              actions={[
                <Button
                  type="primary"
                  onClick={() => handleToggleFavorite(product.id)}
                >
                  {favorites.includes(product.id) ? 'Remove From Cart' : 'Add To Cart'}
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
