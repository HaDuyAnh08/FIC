import React, { useState, useEffect } from "react";
import { Table, Typography, Empty, Button } from "antd";
import { useNavigate } from "react-router-dom";
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";
import { useAuth } from "../../hooks/AuthContext";
import { getRentalItems } from "../../services/cartService";
import { isAuthenticated } from "../../utils/auth";

const { Title, Text } = Typography;

const RentalStatusPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const { token } = useAuth();
  const [rentalItems, setRentalItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchRentalItems = async () => {
      if (!token) {
        setRentalItems([]);
        return;
      }
      try {
        const items = await getRentalItems(token);
        setRentalItems(items);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sách đã thuê:", error);
        alert("Không thể tải trạng thái thuê. Vui lòng thử lại.");
      }
    };
    fetchRentalItems();
  }, [token]);

  const columns = [
    {
      title: "Sách",
      dataIndex: "name",
      key: "name",
      render: (_: any, record: any) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={record.image || "https://via.placeholder.com/50"}
            alt={record.name}
            style={{ width: 50, marginRight: 10 }}
          />
          <span>{record.name || "Tiêu đề không xác định"}</span>
        </div>
      ),
    },
    {
      title: "Giá",
      dataIndex: "rentalPrice",
      key: "rentalPrice",
      render: (price: number) => `${price ? price.toLocaleString() : "0"} đ`,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Tổng phụ",
      key: "subtotal",
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
      <AppHeader isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div style={{ padding: "20px", maxWidth: "1200px", margin: "80px auto" }}>
        <Title level={2}>Trạng thái thuê sách của bạn</Title>
        {rentalItems.length === 0 ? (
          <Empty description="Bạn chưa thuê sách nào">
            <Button type="primary" onClick={() => navigate("/books")}>
              Duyệt sách
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
            <div style={{ textAlign: "right" }}>
              <Text strong style={{ fontSize: "18px" }}>
                Tổng cộng: {totalRentalPrice.toLocaleString()} đ
              </Text>
            </div>
          </>
        )}
      </div>
      <AppFooter />
    </div>
  );
};

export default RentalStatusPage;