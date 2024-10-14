import React, { useState ,useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart } from '../redux/actions/ProductActions';
import { Button, Card, Input, Pagination, Empty, Statistic } from 'antd';

const { Meta } = Card;
const CartList = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const products = useSelector((state) => state.products.products);
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

  const handleRemoveFromCart = (productId) => {
    dispatch(toggleCart(productId));
  };

  const cartProducts = cart.map((productId) =>
    products.find((product) => product.id === productId)
  );

  const totalCost = cartProducts.reduce((total, product) => {
    return total + (product ? product.price : 0); // 
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
      {cartProducts.length === 0 ? (
        <Empty description="No shopping Cart added." />
      ) : (
        <div className="product-list">
          {cartProducts.map((product) => (
            <Card
              key={product.id}
              style={{ width: isMobile ? '100%' :'400px', marginBottom: 20, padding:'10px' }}
              cover={<img alt={product.title} src={product.image} style={{width: isMobile ?'100%' :'300px' , height:'300px', objectFit :'contain'}} />}
              actions={[
                <Button
                  type="primary"
                  onClick={() => handleRemoveFromCart(product.id)}
                >
                  Remove from Cart
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

export default CartList;
