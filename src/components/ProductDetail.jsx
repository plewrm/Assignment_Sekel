import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toggleCart } from '../redux/actions/ProductActions';
import { Button } from 'antd';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.products.products.find((p) => p.id === Number(id))
  );
  const cart = useSelector((state) => state.cart);

  const handleToggleCart = (productId) => {
    dispatch(toggleCart(productId));
  };

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

  return (
    <div className="product-detail">
      {product ? (
        <div className="product-container">
          <div className="product-image">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="product-info">
            <h5 className="product-title">{product.title}</h5>
            <p className="product-description">Description: {product.description}</p>
            <p className="product-category">Category: {product.category}</p>
            <p className="product-price">Price: ${product.price}</p>
            <p className="product-rating">
              Rating: {product.rating?.rate} / 5 ({product.rating?.count} reviews)
            </p>
            <div className="button-group">
              <Button
                type="primary"
                onClick={() => handleToggleCart(product.id)}
              >
                {cart.includes(product.id) ? 'Remove From Cart' : 'Add To Cart'}
              </Button>
              <Button type="primary">
                <Link to="/" className="back-link">Back to Product List</Link>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default ProductDetail;
