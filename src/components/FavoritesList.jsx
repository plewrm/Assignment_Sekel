import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../redux/actions/ProductActions';
import { Button, Card, Input, Pagination, Empty, Statistic } from 'antd';

const { Meta } = Card;

const FavoritesList = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const products = useSelector((state) => state.products.products);

  const handleRemoveFromFavorites = (productId) => {
    dispatch(toggleFavorite(productId));
  };

  const favoriteProducts = favorites.map((productId) =>
    products.find((product) => product.id === productId)
  );

  const totalCost = favoriteProducts.reduce((total, product) => {
    return total + (product ? product.price : 0); // Ensure product exists before accessing price
  }, 0);

  return (
    <div>
      <h1>Shopping Cart</h1>

      <div style={{ marginBottom: '20px', textAlign: 'right' }}>
        <Statistic
          title="Total Cost of Items in Cart"
          value={totalCost}
          precision={2}
          prefix="$"
        />
      </div>
      {favoriteProducts.length === 0 ? (
        <Empty description="No shopping Cart added." />
      ) : (
        <div className="product-list">
          {favoriteProducts.map((product) => (
            <Card
              key={product.id}
              style={{ width: 300, marginBottom: 20 }}
              cover={<img alt={product.title} src={product.image} />}
              actions={[
                <Button
                  type="primary"
                  onClick={() => handleRemoveFromFavorites(product.id)}
                >
                  Remove from Favorites
                </Button>,
              ]}
            >
              <p>Category: {product.category}</p>
              <p style={{ fontWeight: 'bold', fontSize: '16px' }}> Price: ${product.price}</p>
              <p>Rating: {product.rating?.rate} / 5 ({product.rating?.count} reviews)</p>
              <Meta title={product.title} description={product.description} />
            </Card>
          ))}
        </div>
      )}
      <Pagination
        style={{ marginTop: '20px', textAlign: 'center' }}
      />
    </div>
  );
};

export default FavoritesList;
