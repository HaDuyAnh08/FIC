import { InputNumber } from 'antd';

interface BookQuantityProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
}

const BookQuantity: React.FC<BookQuantityProps> = ({ quantity, setQuantity }) => {
  return (
    <InputNumber
      min={1}
      value={quantity}
      onChange={(value) => setQuantity(value || 1)}
      size="large"
    />
  );
};

export default BookQuantity;