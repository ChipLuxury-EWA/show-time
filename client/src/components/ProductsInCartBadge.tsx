import { useSelector } from "react-redux";
import { Badge } from "react-bootstrap";

const ProductsInCartBadge = () => {
  const { cartItems } = useSelector((state: any) => state.cart);
  return cartItems.length > 0 ? (
    <Badge pill bg="success" className="ms-1">
      {cartItems.reduce((acc: number, item: any) => acc + item.chosenTicketsAmount, 0)}
    </Badge>
  ) : null;
};

export default ProductsInCartBadge;
