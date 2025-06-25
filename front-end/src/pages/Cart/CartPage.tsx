import React, { useState, useEffect } from "react";
import { Table, Button, Typography, Empty, message } from "antd";
import { useNavigate } from "react-router-dom";
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";
import { useAuth } from "../../hooks/AuthContext";
import {
  getCartItems,
  removeFromCart,
  checkout,
} from "../../services/cartService";
import { isAuthenticated } from "../../utils/auth";

const { Title, Text } = Typography;

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!token) {
        setCartItems([]);
        return;
      }
      try {
        setLoading(true);
        const items = await getCartItems(token);
        setCartItems(items);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        message.error("Failed to load cart. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, [token]);

  const handleRemoveFromCart = async (id: string) => {
    if (!token) return;
    try {
      await removeFromCart(id, token);
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
      message.success("Book removed from cart!");
    } catch (error) {
      console.error("Error removing from cart:", error);
      message.error("Failed to remove book from cart. Please try again.");
    }
  };

  const handleCheckout = async () => {
    if (!token) {
      message.warning("Please login to proceed with checkout.");
      navigate("/");
      return;
    }
    try {
      const bookIds = cartItems.map((item) => item.id);
      await checkout(bookIds, token);
      setCartItems([]);
      message.success("Checkout successful!");
      navigate("/rental-status");
    } catch (error) {
      console.error("Error during checkout:", error);
      message.error("Failed to process checkout. Please try again.");
    }
  };

  const columns = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      render: (_: any, record: any) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={record.image || "https://via.placeholder.com/50"}
            alt={record.name}
            style={{ width: 50, marginRight: 10 }}
          />
          <span>{record.name || "Unknown Title"}</span>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "rentalPrice",
      key: "rentalPrice",
      render: (price: number) => `${price ? price.toLocaleString() : "0"} đ`,
    },
    {
      title: "Subtotal",
      key: "subtotal",
      render: (_: any, record: any) =>
        `${(
          (record.rentalPrice || 0) * (record.quantity || 1)
        ).toLocaleString()} đ`,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Button danger onClick={() => handleRemoveFromCart(record.id)}>
          Remove
        </Button>
      ),
    },
  ];

  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.rentalPrice || 0) * (item.quantity || 1),
    0
  );

  return (
    <div>
      <AppHeader isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div style={{ padding: "20px", maxWidth: "1200px", margin: "80px auto" }}>
        <Title level={2}>Your Cart</Title>
        {loading ? (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            Loading...
          </div>
        ) : cartItems.length === 0 ? (
          <Empty description="Your cart is empty">
            <Button type="primary" onClick={() => navigate("/")}>
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
            <div style={{ textAlign: "right" }}>
              <Text strong style={{ fontSize: "18px" }}>
                Total: {totalPrice.toLocaleString()} đ
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
                <Button danger size="large" onClick={() => setCartItems([])}>
                  Clear Cart
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
      <AppFooter />
    </div>
  );
};

export default CartPage;
