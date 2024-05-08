import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, toggleFavorite } from '../redux/actions/ProductActions'; // Importing Redux actions
import { Link } from 'react-router-dom';
import { Card, Button, Input, Pagination, Alert } from 'antd';

const { Meta } = Card;

const ProductList = () => {
  const dispatch = useDispatch(); // Initialize dispatch hook
  const products = useSelector((state) => state.products.products); // Get products from Redux store
  const favorites = useSelector((state) => state.favorites); // Get favorites from Redux store

  const [searchQuery, setSearchQuery] = useState(''); 
  const [isLoading, setIsLoading] = useState(true); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [errorMessage, setErrorMessage] = useState(null); 

  const itemsPerPage = 15; 

  useEffect(() => {
    setIsLoading(true); 
    setErrorMessage(null); 

    // Fetch products from Redux store
    dispatch(fetchProducts())
      .then(() => {
        setIsLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching products:', error); 
        setIsLoading(false); 
        setErrorMessage('Error fetching products. Please try again.'); 
      });
  }, [dispatch]); // Dependency array for useEffect to run only once on component mount

  // Function to handle adding/removing favorite product
  const handleToggleFavorite = (productId) => {
    dispatch(toggleFavorite(productId)); 
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate start and end index for pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get current page products
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page); 
  };

  return (
    <div>
      <h1 className='text-center'>Product's List</h1>
      {/* Search input field */}
      <Input
        placeholder="Search products"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      {/* Error message display */}
      {errorMessage && (
        <Alert
          message={errorMessage}
          type="error"
          closable
          onClose={() => setErrorMessage(null)}
          style={{ marginBottom: '20px' }}
        />
      )}
      {/* Loading indicator */}
      {isLoading ? (
        <p id='loading'></p>
      ) : (
        // Product list display
        <div className="product-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {currentProducts.map((product) => (
            // Product card
            <Card
              key={product.id}
              style={{ width: '30%', marginBottom: 20 }} 
              cover={<img alt={product.title} src={product.thumbnail} style={{ height: 200, objectFit: 'cover' }} />}
              actions={[
                // View details button
                <Button type="primary">
                  <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'white' }}>View Details</Link>
                </Button>
                ,
                // Add/Remove favorite button
                <Button
                  type="primary"
                  onClick={() => handleToggleFavorite(product.id)}
                  disabled={favorites.includes(product.id) && favorites.length >= 5}
                >
                  {favorites.includes(product.id) ? 'Remove Favorite' : 'Add Favorite'}
                </Button>,
              ]}
            >
              <Meta title={product.title} description={product.description} />
            </Card>
          ))}
        </div>
      )}
      {/* Pagination component */}
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
