import { useContext } from 'react';
import { Button } from 'antd';
import { CartContext } from '../App';
import type { Book } from '../types';

interface AddToCartButtonProps {
  book: Book;
  quantity: number;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ book, quantity }) => {
  const { addToCart } = useContext(CartContext);
  return (
    <Button
      type="primary"
      size="large"
      onClick={() => addToCart(book, quantity)}
    >
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;