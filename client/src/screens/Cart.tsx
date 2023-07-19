import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";
import ProductAmountForm from "../components/ProductAmountForm";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state: any) => state.cart);
  const { cartItems } = cart;

  const isCartEmpty = cartItems.length === 0;

  const getAmountOfTicketsInCart = () => {
    return cartItems.reduce((acc: number, item: any) => acc + item.chosenTicketsAmount, 0);
  };

  const getTotalPriceOfTicketsInCart = () => {
    return cartItems.reduce((acc: number, item: any) => acc + item.chosenTicketsAmount * item.price, 0).toFixed(2);
  };

  const cartItemsDynamicList = cartItems.map((item: any) => (
    <ListGroup.Item key={item._id}>
      <Row>
        <Col md={2}>
          <Image src={item.image} alt={item.name} fluid rounded />
        </Col>
        <Col md={3}>
          <Link to={`/product/${item._id}`}>{item.name}</Link>
        </Col>
        <Col md={2}>{item.price} NIS</Col>
        <Col md={2}>
          {/* change length to tickets in stock */}
          <ProductAmountForm value={item.chosenTicketsAmount} handleChange={(e: Event) => console.log(e)} length={10} />
        </Col>
        <Col md={2}>
          <Button variant="light">
            <FaTrash />
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  ));

  return (
    <Row>
      <Col md={8}>
        <h1 className="mb-1">Shopping cart</h1>
        {isCartEmpty ? (
          <Message>Your Cart is empty</Message>
        ) : (
          <ListGroup variant="flush">{cartItemsDynamicList}</ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal: {getAmountOfTicketsInCart()} tickets</h2>
              {getTotalPriceOfTicketsInCart()} NIS
            </ListGroup.Item>
            <ListGroup.Item>
              <Button className="btn-block" disabled={cartItems.length === 0}>Proceed to checkout</Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default Cart;
