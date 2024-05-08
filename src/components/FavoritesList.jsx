import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../redux/actions/ProductActions';
import { Button, Card, Input, Pagination, Empty } from 'antd'; 

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

  return (
    <div>
      <h1>Favorite Products</h1>
      <Input
        placeholder="Search favorite products"
        style={{ marginBottom: '20px' }}
      />
      {favoriteProducts.length === 0 ? (
        <Empty description="No favorite products added." />
      ) : (
        <div className="product-list">
          {favoriteProducts.map((product) => (
            <Card
              key={product.id}
              style={{ width: 300, marginBottom: 20 }}
              cover={<img alt={product.title} src={product.thumbnail} />}
              actions={[
                <Button
                  type="primary"
                  onClick={() => handleRemoveFromFavorites(product.id)}
                >
                  Remove from Favorites
                </Button>,
              ]}
            >
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
