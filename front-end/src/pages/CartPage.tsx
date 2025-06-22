import React from 'react';
import { Table, Button, InputNumber, Typography, Empty } from 'antd';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../hooks/CartContext';
import { isAuthenticated } from '../utils/auth';

const { Title, Text } = Typography;

const CartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(isAuthenticated());

  const columns = [
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: any) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={record.image || 'https://via.placeholder.com/50'}
            alt={record.name}
            style={{ width: 50, marginRight: 10 }}
          />
          <span>{record.name || 'Unknown Title'}</span>
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'rentalPrice',
      key: 'rentalPrice',
      render: (price: number) => `$${price ? price.toFixed(2) : '0.00'}`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_: any, record: any) => (
        <InputNumber
          min={1}
          value={record.quantity}
          onChange={(value) => updateQuantity(record.id, value as number)}
        />
      ),
    },
    {
      title: 'Subtotal',
      key: 'subtotal',
      render: (_: any, record: any) =>
        `$${((record.rentalPrice || 0) * record.quantity).toFixed(2)}`,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Button danger onClick={() => removeFromCart(record.id)}>
          Remove
        </Button>
      ),
    },
  ];

  const handleCheckout = () => {
    if (!isLoggedIn) {
      alert('Please login to proceed with checkout.');
      navigate('/');
      return;
    }
    alert('Proceeding to checkout!');
  };

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '80px auto' }}>
        <Title level={2}>Your Cart</Title>
        {cartItems.length === 0 ? (
          <Empty description="Your cart is empty">
            <Button type="primary" onClick={() => navigate('/')}>
              Continue Shopping
            </Button>
          </Empty>
        ) : (
          <>
            <Table
              columns={columns}
              dataSource={cartItems}
              rowKey="id"
              pagination={false}
              style={{ marginBottom: 20 }}
            />
            <div style={{ textAlign: 'right' }}>
              <Text strong style={{ fontSize: '18px' }}>
                Total: ${totalPrice.toFixed(2)}
              </Text>
              <div style={{ marginTop: 20 }}>
                <Button
                  type="primary"
                  size="large"
                  onClick={handleCheckout}
                  style={{ marginRight: 10 }}
                >
                  Proceed to Checkout
                </Button>
                <Button danger size="large" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;