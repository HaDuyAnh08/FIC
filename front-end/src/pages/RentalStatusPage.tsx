import React from 'react';
import { Table, Typography, Empty, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../hooks/CartContext';
import { isAuthenticated } from '../utils/auth';

const { Title, Text } = Typography;

const RentalStatusPage: React.FC = () => {
  const { rentalItems } = useCart();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(isAuthenticated());

  const columns = [
    {
      title: 'Book',
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
      render: (price: number) => `${price ? price.toLocaleString() : '0'} đ`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Subtotal',
      key: 'subtotal',
      render: (_: any, record: any) =>
        `${((record.rentalPrice || 0) * record.quantity).toLocaleString()} đ`,
    },
  ];

  const totalRentalPrice = rentalItems.reduce(
    (total, item) => total + (item.rentalPrice || 0) * item.quantity,
    0
  );

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '80px auto' }}>
        <Title level={2}>Your Rental Status</Title>
        {rentalItems.length === 0 ? (
          <Empty description="You have no rented books">
            <Button type="primary" onClick={() => navigate('/books')}>
              Browse Books
            </Button>
          </Empty>
        ) : (
          <>
            <Table
              columns={columns}
              dataSource={rentalItems}
              rowKey="id"
              pagination={false}
              style={{ marginBottom: 20 }}
            />
            <div style={{ textAlign: 'right' }}>
              <Text strong style={{ fontSize: '18px' }}>
                Total: {totalRentalPrice.toLocaleString()} đ
              </Text>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default RentalStatusPage;