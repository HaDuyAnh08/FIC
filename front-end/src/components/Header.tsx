import React from 'react';
import { Dropdown, Menu, Button } from 'antd';
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import axios from '../services/axios';

interface HeaderProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.get('/auth/google');
      window.location.href = response.data.authUrl;
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div style={{ position: 'fixed', top: 0, width: '100%', background: '#f5f5dc', padding: '10px', zIndex: 1000 }}>
      <img src={logo} alt="Logo" style={{ height: '40px', marginRight: '20px' }} />
      <span style={{ fontSize: '24px', color: '#1E90FF' }}>LIBERO Book Store</span>
      <div style={{ float: 'right' }}>
        {isLoggedIn ? (
          <>
            <ShoppingCartOutlined
              style={{ fontSize: '24px', marginRight: '20px', cursor: 'pointer' }}
              onClick={() => navigate('/cart')} // Điều hướng đến giỏ hàng
            />
            <Dropdown overlay={userMenu} trigger={['click']}>
              <UserOutlined style={{ fontSize: '24px', cursor: 'pointer' }} />
            </Dropdown>
          </>
        ) : (
          <Button
            onClick={handleLogin}
            style={{ padding: '5px 15px', background: '#1A73E8', color: 'white' }}
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;