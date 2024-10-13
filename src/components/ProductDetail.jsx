import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toggleFavorite } from '../redux/actions/ProductActions';
import { Button } from 'antd';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.products.products.find((p) => p.id === Number(id))
  );
  const favorites = useSelector((state) => state.favorites);

  const handleToggleFavorite = (productId) => {
    dispatch(toggleFavorite(productId));
  };

  return (
    <div>
      {product ? (
        <div>
          <h1>{product.title}</h1>
          <img src={product.image} alt={product.title} />
          <p>Description: {product.description}</p>
          <p>Category: {product.category}</p>
          <p style={{ fontWeight: 'bold', fontSize: '16px' }}> Price: ${product.price}</p>
          <p>Rating: {product.rating?.rate} / 5 ({product.rating?.count} reviews)</p>

          <Button
            type="primary"
            onClick={() => handleToggleFavorite(product.id)}
            disabled={favorites.includes(product.id) && favorites.length >= 5}
          >
            {favorites.includes(product.id) ? 'Remove From Cart' : 'Add To Cart'}
          </Button> &nbsp; &nbsp; <Button type="primary">
                  <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Back to Product List</Link>
                </Button><br />
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default ProductDetail;
